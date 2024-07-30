using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Repositories.Imp;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using MercadoPago.Client;
using MercadoPago.Client.Payment;
using MercadoPago.Config;
using MercadoPago.Resource.Payment;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace _2nf_API.Services.Imp
{
    public class RefundService : IRefundService
    {
        private readonly IRefundRepository _refundRepository;
        private readonly ISaleRepository _saleRepository;
        private readonly IShipmentRepository _shipmentRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public RefundService(
            IRefundRepository refundRepository,
            ISaleRepository saleRepository,
            IMapper mapper,
            IConfiguration configuration,
            IShipmentRepository shipmentRepository,
            IClientRepository clientRepository,
            IArticleRepository articleRepository
            )
        {
            _refundRepository = refundRepository;
            _saleRepository = saleRepository;
            _mapper = mapper;
            _configuration = configuration;
            _shipmentRepository = shipmentRepository;
            _clientRepository = clientRepository;
            _articleRepository = articleRepository;
        }

        public async Task<RefundResponse> Create(RefundRequest request)
        {
            MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");

            var sale = await _saleRepository.GetById(request.SaleId);
            var shipment = await _shipmentRepository.GetBySaleId(request.SaleId);
            var existentRefund = await _refundRepository.GetBySaleId(request.SaleId);
            var paymentClient = new PaymentClient();
            var payment = await paymentClient.GetAsync(sale.PaymentId);
            if (payment.Status == "refunded") throw new BadHttpRequestException("No se puede reembolsar un pago ya reembolsado");
            if (shipment.ShipmentState == 1 || shipment.ShipmentState == 2) throw new BadHttpRequestException("El envío debe estar pendiente, cancelado o devuelto");
            if (sale.Canceled || existentRefund != null) throw new BadHttpRequestException("Ya existe un reembolso o la venta está cancelada");

            var refundClient = new PaymentRefundClient();

            var idempotencyKey = Guid.NewGuid().ToString();

            var options = new RequestOptions();

            options.CustomHeaders["X-Idempotency-Key"] = idempotencyKey;

            PaymentRefund refundResponse = null;

            try
            {
                refundResponse = await refundClient.RefundAsync(sale.PaymentId, requestOptions: options);

                if(refundResponse != null && refundResponse.Id != null)
                {
                    var refund = new Refund
                    {
                        //RefundId = refundResponse.Id.Value,
                        ClientDoc = sale.ClientDoc,
                        CreatedAt = DateTime.Now,
                        Reason = request.Reason,
                        Sale = sale,
                        State = 0
                    };

                    var refundToUpdate = ActualizarEstadoRefund(refundResponse.Status, refund);

                    var refundSaved = await _refundRepository.Save(refund);

                    NotificarCliente(refundSaved);

                    await ActualizarVentaEnvio(refund, shipment, sale);

                    var response = _mapper.Map<RefundResponse>(refundSaved);

                    return response;
                }
                throw new Exception("No se pudo crear el reembolso");
            }
            catch (Exception ex)
            {
                if(refundResponse != null)
                    throw new WebException(refundResponse.ApiResponse.Content);
                else
                    throw ex;
            }
        }

        private async void NotificarCliente(Refund refundCreated)
        {
            //var refundState = "";
            //switch (refundCreated.State)
            //{
            //    case 0: refundState = "pendiente"; break;
            //    case 1: refundState = "en proceso"; break;
            //    case 2: refundState = "finalizado"; break;
            //}
            if (refundCreated.State == 2)
            {
                var client = await _clientRepository.GetByDoc(refundCreated.ClientDoc);
                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress("2nf.clothing@gmail.com");
                mail.To.Add(client.User.Email);
                mail.Subject = "Su compra fue cancelada con éxito";

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
                sb.AppendLine();
                sb.AppendLine("Hemos procesado su solicitud de cancelación de compra. Su reembolso por el monto de AR$: " + CalcularTotal(refundCreated.Sale.Details) + " fue aprobado.");
                sb.AppendLine("El importe debería verse reflejado en su cuenta o próximo resumen de tarjeta de crédito");
                sb.AppendLine();

                sb.AppendLine("Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.");
                sb.AppendLine();
                sb.AppendLine("Saludos cordiales,");
                sb.AppendLine("Equipo de Atención al Cliente");

                mail.Body = sb.ToString();

                // Si necesitas adjuntar un archivo
                // mail.Attachments.Add(new Attachment("ruta/al/archivo"));

                // Configuración del cliente SMTP
                SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                smtpServer.Port = 587; // O el puerto que uses
                smtpServer.Credentials = new NetworkCredential(_configuration["Email:Direction"], _configuration["Email:Token"]);
                smtpServer.EnableSsl = true; // True si el servidor SMTP requiere SSL

                // Enviar el correo
                smtpServer.Send(mail);
                Console.WriteLine("Correo enviado exitosamente.");
            }
        }

        private double CalcularTotal(List<SaleDetail> details)
        {
            double total = 0;
            foreach (var detail in details)
            {
                total += detail.Amount * detail.UnitPrice;
            }
            return total;
        }

        private async Task ActualizarVentaEnvio(Refund refund, Shipment shipment, Sale sale)
        {

            //Se cancela la venta de todas formas
            sale.Canceled = true;
            //se devuelven los productos al stock
            shipment.Sale = await ActualizarStock(sale);
            //se cancela el envío de todas formas
            if(shipment.ShipmentState != 3) shipment.ShipmentState = 4;
            
            //await _saleRepository.Update(sale);
            await _shipmentRepository.Update(shipment);
        }

        private Refund ActualizarEstadoRefund(string status, Refund refund)
        {
            if (status == "approved")
            {
                refund.State = 2;
                refund.UpdatedAt = DateTime.Now;
            }
            if (status == "authorized" || status == "in_process")
            {
                refund.State = 1;
            }
            if (status == "cancelled" || status == "rejected")
            {
                refund.State = 0;
            }
            return refund;
        }

        private async Task<Sale> ActualizarStock(Sale sale)
        {
            foreach (var detail in sale.Details)
            {
                //sale.Details.Remove(detail);
                var stock = detail.Article.Stocks.Find(x => x.Size.Id == detail.Size.Id);

                //si existe el stock
                if (stock != null)
                {
                    //detail.Article.Stocks.Remove(stock);
                    stock.Amount += detail.Amount;
                    stock.LastAmountAdded = detail.Amount;
                    stock.UpdatedAt = DateTime.Now;
                    //detail.Article.Stocks.Add(stock);
                    //var updated = await _articleRepository.UpdateArticle(article);
                    //var response = _mapper.Map<ArticleResponse>(updated);
                }
                else
                {
                    var newstock = new Stock
                    {
                        Amount = detail.Amount,
                        Article = detail.Article,
                        LastAmountAdded = detail.Amount,
                        Size = detail.Size,
                        UpdatedAt = DateTime.Now
                    };
                    //detail.Article.Stocks.Add(newstock);
                    //var updated = await _articleRepository.UpdateArticle(article);
                    //var response = _mapper.Map<ArticleResponse>(updated);
                }
                //sale.Details.Add(detail);
            }
            return sale;
        }

        public async Task<List<RefundResponse>> Get(int? state, int? clientDoc, DateTime? fechaInicio, DateTime? fechaFin)
        {
            await ActualizarEstados();
            var refunds = await _refundRepository.Get(state, clientDoc, fechaInicio, fechaFin);
            var response = _mapper.Map<List<RefundResponse>>(refunds);
            return response;
        }

        private async Task ActualizarEstados()
        {
            var refundClient = new PaymentRefundClient();
            var refunds = await _refundRepository.GetNoFinished();
            foreach (var refund in refunds)
            {
                var refundResponse = await refundClient.GetAsync(refund.Sale.PaymentId, refund.RefundId);
                if (refundResponse.Status == "approved") refund.State = 2;
                if (refundResponse.Status == "rejected" || refundResponse.Status == "cancelled")
                {
                    try
                    {
                        await TryAgain(refund.Id);
                    }
                    catch (Exception)
                    {

                    }
                }
                else refund.State = 1;
                await _refundRepository.Update(refund);
            }
        }

        public async Task<RefundResponse> GetById(int id)
        {
            await ActualizarEstados();
            var refund = await _refundRepository.GetById(id);
            var response = _mapper.Map<RefundResponse>(refund);
            return response;
        }

        public async Task<RefundResponse> TryAgain(int id)
        {
            MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");

            var existentRefund = await _refundRepository.GetById(id);

            var refundClient = new PaymentRefundClient();

            var idempotencyKey = Guid.NewGuid().ToString();

            var options = new RequestOptions();

            options.CustomHeaders["X-Idempotency-Key"] = idempotencyKey;

            options.AccessToken = _configuration.GetValue<string>("Token");

            var refundResponse = await refundClient.RefundAsync(existentRefund.Sale.PaymentId, requestOptions: options);

            if (refundResponse.ApiResponse.StatusCode == 200 || refundResponse.ApiResponse.StatusCode == 201)
            {
                Refund refundToUpdate = ActualizarEstadoEntidadReembolso(refundResponse.Status, existentRefund);

                var refundUpdated = await _refundRepository.Update(refundToUpdate);

                NotificarCliente(refundUpdated);

                var response = _mapper.Map<RefundResponse>(refundUpdated);

                return response;
            }
            throw new Exception("No se pudo procesar el reembolso por un error con MercadoPago");
        }

        private Refund ActualizarEstadoEntidadReembolso(string status, Refund refund)
        {
            if (status == "approved")
            {
                refund.State = 2;
                refund.UpdatedAt = DateTime.Now;
            }
            if (status == "authorized" || status == "in_process")
            {
                refund.State = 1;
                refund.UpdatedAt = DateTime.Now;
            }
            if (status == "cancelled" || status == "rejected")
            {
                refund.State = 0;
                refund.UpdatedAt = DateTime.Now;
            }
            return refund;
        }
    }
}
