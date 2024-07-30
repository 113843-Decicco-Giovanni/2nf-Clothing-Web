using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Repositories.Imp;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace _2nf_API.Services.Imp
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ShipmentService(IShipmentRepository repository, IMapper mapper, IConfiguration configuration, IClientRepository clientRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
            _clientRepository = clientRepository;
        }

        public async Task<List<ShipmentResponse>> GetShipmentsByClient(int nroDoc)
        {
            var shipments = await _repository.GetByClient(nroDoc);
            var response = _mapper.Map<List<ShipmentResponse>>(shipments);

            return response;
        }

        public async Task<List<ShipmentResponse>> GetShipments(
            int? estado,
            DateTime? fechaInicio,
            DateTime? fechaFin,
            int? clientDoc)
        {
            var shipments = await _repository.Get(estado, fechaInicio, fechaFin, clientDoc);
            var response = _mapper.Map<List<ShipmentResponse>>(shipments);

            return response;
        }

        public async Task<ShipmentResponse> UpdateShipmentState(int shipmentId, long trackingId, string service)
        {
            var shipment = await _repository.GetById(shipmentId);

            shipment.Service = service;
            shipment.TrackingId = trackingId;
            shipment.ShipmentState = 1;
            shipment.ProcessDate = DateTime.Now;

            var updated = await _repository.Update(shipment);

            EnviarCorreo(updated);

            var response = _mapper.Map<ShipmentResponse>(updated);

            return response;
        }

        private async void EnviarCorreo(Shipment updated)
        {
            try
            {
                //var updated = await _repository.GetById(updated.Id);
                var sale = updated.Sale;
                var client = sale.Client;
                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress("2nf.clothing@gmail.com");
                mail.To.Add(client.User.Email);

                mail.Subject = "¡El envío de sus productos fue procesado!";

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
                sb.AppendLine();
                sb.AppendLine("Ya procesamos su envío. A continuación, encontrará los detalles de su pedido:");
                sb.AppendLine();

                sb.AppendLine("Datos del Cliente:");
                sb.AppendLine("Nombre: " + client.Name + " " + client.Surname);
                sb.AppendLine("Documento: " + client.DocId);
                sb.AppendLine("Teléfono: " + client.Phone);
                sb.AppendLine("Dirección: " + client.Street + " " + client.StreetNumber + ", " + client.City + ", " + client.State + ", " + client.Country);
                sb.AppendLine("Código Postal: " + client.PostalCode);
                sb.AppendLine();
                sb.AppendLine("Datos de la Venta:");
                sb.AppendLine("Fecha de la venta: " + sale.Date.ToString("dd/MM/yyyy"));
                sb.AppendLine("ID de Pago: " + sale.PaymentId);
                sb.AppendLine();

                sb.AppendLine("Detalles de la Venta:");
                foreach (var detail in sale.Details)
                {
                    sb.AppendLine("- Artículo: " + detail.Article.Name);
                    sb.AppendLine("  Tamaño: " + detail.Size.Description);
                    sb.AppendLine("  Cantidad: " + detail.Amount);
                    sb.AppendLine("  Precio Unitario: $" + detail.UnitPrice);
                    sb.AppendLine("  Subtotal: $" + (detail.Amount * detail.UnitPrice));
                    sb.AppendLine();
                }
                double total = CalcularTotal(sale.Details);
                sb.AppendLine("Total: $" + total);
                sb.AppendLine();

                sb.AppendLine("Datos del Envío:");
                sb.AppendLine((string)("Dirección: " + updated.Street + " " + updated.StreetNumber + ", " + updated.City + ", " + updated.State));
                if (!string.IsNullOrEmpty((string?)updated.Floor))
                {
                    sb.AppendLine((string)("Piso: " + updated.Floor));
                }
                if (!string.IsNullOrEmpty((string?)updated.Appartament))
                {
                    sb.AppendLine((string)("Departamento: " + updated.Appartament));
                }
                sb.AppendLine((string)("Código Postal: " + updated.PostalCode));
                sb.AppendLine((string)("Estado del Envío: " + (updated.ShipmentState == 0 ? "Pendiente" : "Procesado")));
                if (updated.TrackingId.HasValue)
                {
                    sb.AppendLine((string)("ID de Seguimiento: " + updated.TrackingId.Value));
                }
                if (!string.IsNullOrEmpty((string?)updated.Service))
                {
                    sb.AppendLine((string)("Servicio: " + updated.Service));
                }
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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

        public async Task<ShipmentResponse> GetShipmentById(int id)
        {
            var shipment = await _repository.GetById(id);

            var response = _mapper.Map<ShipmentResponse>(shipment);

            return response;
        }

        public async Task<ShipmentResponse> ModifyShipment(int id, ShipmentRequest request)
        {
            var shipment = await _repository.GetById(id);
            var shipmentUpdated = _mapper.Map(request, shipment);
            var updated = await _repository.Update(shipmentUpdated);
            var response = _mapper.Map<ShipmentResponse>(updated);

            return response;
        }

        public async Task<ShipmentResponse> GetShipmentBySaleId(int saleId)
        {
            var shipment = await _repository.GetBySaleId(saleId);

            var response = _mapper.Map<ShipmentResponse>(shipment);

            return response;
        }

        public async Task<ShipmentResponse> CancelShipment(int id)
        {
            var shipment = await _repository.GetById(id);

            shipment.ShipmentState = 4;
            shipment.Sale.Canceled = true;
            shipment.Sale.RefundPending = true;
            shipment.Sale = DevolverStock(shipment.Sale);

            await NotificarClienteCancelado(shipment);

            var updated = await _repository.Update(shipment);
            var response = _mapper.Map<ShipmentResponse>(updated);

            return response;
        }

        private async Task NotificarClienteCancelado(Shipment created)
        {
            try
            {
                var client = await _clientRepository.GetByDoc(created.ClientDoc);
                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress("2nf.clothing@gmail.com");
                mail.To.Add(client.User.Email);
                mail.Subject = "Se ha cancelado el envío";

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
                sb.AppendLine();
                sb.AppendLine("Se ha cancelado el envío del producto.");
                sb.AppendLine("Será contactado por este medio a la brevedad cuando se reembolse el dinero");
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
            catch { }

        }

        private Sale DevolverStock(Sale sale)
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
    }
}
