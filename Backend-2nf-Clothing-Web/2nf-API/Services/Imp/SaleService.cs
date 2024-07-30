using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using MercadoPago.Client.Common;
using MercadoPago.Client.Payment;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Payment;
using MercadoPago.Resource.Preference;
using Newtonsoft.Json;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace _2nf_API.Services.Imp
{
    public class SaleService : ISaleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IClientRepository _clientRepository;
        private readonly ISaleRepository _saleRepository;
        private readonly IShipmentRepository _shipmentRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public SaleService(
            IArticleRepository articleRepository, 
            IConfiguration configuration, 
            ISaleRepository saleRepository, 
            IClientRepository clientRepository,
            IShipmentRepository shipmentRepository,
            IMapper mapper)
        {
            _articleRepository = articleRepository;
            _configuration = configuration;
            _saleRepository = saleRepository;
            _clientRepository = clientRepository;
            _shipmentRepository = shipmentRepository;
            _mapper = mapper;
        }

        public async Task<PreferenceResponse> CreatePreference(CreatePreferenceRequest request)
        {
            MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");

            var client = new PreferenceClient();
            
            var items = await MapearArticulos(request);

            Console.WriteLine("Cantidad de artículos: " + items.Count);

            var customer = await _clientRepository.GetById(request.ClientId);

            PreferencePayerRequest payer = GenerarPayer(request,  customer);

            PreferenceShipmentsRequest shipments = GenerarShipment(request);

            PreferenceBackUrlsRequest backUrls = GenerarBackUrls();

            PreferenceRequest prefRequest = GenerarPreferenceRequest(items, backUrls, payer, shipments);

            Preference preference = await client.CreateAsync(prefRequest);

            Console.WriteLine("Codigo de respuesta de mercadolibre: " + preference.ApiResponse.StatusCode);

            Console.WriteLine("Preference ID: " + preference.Id);

            var response = new PreferenceResponse()
            {
                Id = preference.Id,
            };

            return response;
        }

        public async Task<PaymentStatusResponse> GetPaymentStatus(long paymentId)
        {
            MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");

            if (paymentId > 0)
            {
                var client = new PaymentClient();
                var payment = await client.GetAsync(paymentId);

                return new PaymentStatusResponse { Id = paymentId, Status = payment.Status };
            }
            throw new NullReferenceException("El payment_id no puede ser 0");
        }

        public async Task<Sale> ReadWebHook(HttpRequest request)
        {
            using (StreamReader reader = new StreamReader(request.Body, encoding: Encoding.UTF8))
            {
                string requestBody = await reader.ReadToEndAsync();
                dynamic data = JsonConvert.DeserializeObject(requestBody);
                Console.WriteLine("data: " + data);

                if(data != null && data.data != null && data.data.id != null)
                {
                    string id = data.data.id;
                    MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");
                    var client = new PaymentClient();

                    var payment = await client.GetAsync(long.Parse(id));

                    if (payment.Status == "approved")
                    {
                        var response = await GenerarVenta(payment);
                        return response;
                    }
                    else
                    {
                        throw new Exception("El pago no fue aprobado todavía");
                    }
                }
                throw new Exception("No se pudo leer el estado de pago");
            }
        }

        private async Task<List<PreferenceItemRequest>> MapearArticulos(CreatePreferenceRequest request)
        {
            var items = new List<PreferenceItemRequest>();

            foreach (var item in request.Details)
            {
                var article = await _articleRepository.GetById(item.ArticleId);
                var itemToAdd = new PreferenceItemRequest();
                itemToAdd.Id = article.Id.ToString();
                itemToAdd.Title = article.Name;
                itemToAdd.Description = item.SizeId.ToString();
                itemToAdd.UnitPrice = (decimal)article.Price;
                itemToAdd.PictureUrl = article.Images[0].URL;
                itemToAdd.Quantity = item.Amount;
                items.Add(itemToAdd);
            }
            return items;
        }

        private PreferenceRequest GenerarPreferenceRequest(
            List<PreferenceItemRequest> items, 
            PreferenceBackUrlsRequest backUrls,
            PreferencePayerRequest payer,
            PreferenceShipmentsRequest shipment)
        {
            return new PreferenceRequest()
            {
                Items = items,
                BackUrls = backUrls,
                NotificationUrl = "https://9f5c-190-120-110-122.ngrok-free.app/api/sale/webhook-payment",
                AutoReturn = "approved",
                BinaryMode = true,
                Payer = payer,
                Shipments = shipment,
                AdditionalInfo = shipment.ReceiverAddress.City
            };
        }

        private PreferenceBackUrlsRequest GenerarBackUrls()
        {
            return new PreferenceBackUrlsRequest()
            {
                Success = "http://localhost:4200/payment-status",
                Pending = "http://localhost:4200/payment-status",
                Failure = "http://localhost:4200/payment-status"
            };
        }


        private PreferencePayerRequest GenerarPayer(CreatePreferenceRequest request, Client customer)
        {
            return new PreferencePayerRequest()
            {
                Name = customer.DocId.ToString(),
                Surname = request.City + "|" + request.State,
                Identification = new IdentificationRequest
                {
                    Type = "DNI",
                    Number = customer.DocId.ToString()
                },
                Email = request.Email,
                Phone = new PhoneRequest
                {
                    AreaCode = "",
                    Number = request.Phone
                },
                Address = new AddressRequest
                {
                    StreetName = request.Street,
                    StreetNumber = request.StreetNumber.ToString(),
                    ZipCode = request.PostalCode
                }
            };
        }

        private PreferenceShipmentsRequest GenerarShipment(CreatePreferenceRequest request)
        {
            return new PreferenceShipmentsRequest
            {
                //FreeShipping = true,
                ReceiverAddress = new PreferenceReceiverAddressRequest
                {
                    Floor = request.Floor,
                    Apartment = request.Appartement,
                    StreetName = request.Street,
                    StreetNumber = request.StreetNumber.ToString(),
                    City = request.City,
                    State = request.State,
                    Country = "Argentina",
                    ZipCode = request.PostalCode
                },
                Mode = "not_specified"
            };
        }

        private async Task<Sale> GenerarVenta(Payment payment)
        {
            var dni = int.Parse(payment.AdditionalInfo.Payer.FirstName);
            var client = await _clientRepository.GetByDoc(dni);

            var cadena = payment.AdditionalInfo.Payer.LastName;

            var ciudad = cadena.Split("|")[0];
            var state = cadena.Split("|")[1];

            var details = new List<SaleDetail>();
            decimal paymentValue = 0;

            foreach (var det in payment.AdditionalInfo.Items)
            {
                var article = await _articleRepository.GetById( int.Parse(det.Id) );
                var size = await _articleRepository.GetSizeById( int.Parse(det.Description) );
                var detail = new SaleDetail
                {
                    Article = article,
                    Size = size,
                    Amount = det.Quantity.Value,
                    UnitPrice = article.Price
                };
                details.Add(detail);
                paymentValue += (decimal)article.Price;
            }

            Sale sale = new Sale()
            {
                Client = client,
                ClientDoc = client.DocId,
                Date = DateTime.Now,
                Details = details,
                PaymentId = payment.Id.Value
            };

            Sale existingSale = await _saleRepository.GetByPaymentId( payment.Id.Value );

            if(existingSale != null)
            {
                throw new DuplicateWaitObjectException("La venta ya está ingresada");
            }

            await DescontarStock(sale);

            var respuesta = await _saleRepository.Save(sale);

            var shipment = new Shipment
            {
                Floor = payment.AdditionalInfo.Shipments.ReceiverAddress.Floor,
                ClientDoc = dni,
                Appartament = payment.AdditionalInfo.Shipments.ReceiverAddress.Apartment,
                Street = payment.AdditionalInfo.Shipments.ReceiverAddress.StreetName,
                StreetNumber = int.Parse(payment.AdditionalInfo.Shipments.ReceiverAddress.StreetNumber),
                City = ciudad,
                State = state,
                PostalCode = payment.AdditionalInfo.Shipments.ReceiverAddress.ZipCode,
                ShipmentState = 0,
                Sale = respuesta
            };

            Shipment shipmentEntity = await _shipmentRepository.Save(shipment);

            EnviarCorreo(client, sale, shipment);

            return respuesta;
        }

        private void EnviarCorreo(Client client, Sale sale, Shipment shipment)
        {
            try
            {
                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress("2nf.clothing@gmail.com");
                mail.To.Add(client.User.Email);
                mail.Subject = "¡Se confirmó la compra de tus productos!";

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
                sb.AppendLine();
                sb.AppendLine("Gracias por su compra. A continuación, encontrará los detalles de su pedido:");
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
                sb.AppendLine("Dirección: " + shipment.Street + " " + shipment.StreetNumber + ", " + shipment.City + ", " + shipment.State);
                if (!string.IsNullOrEmpty(shipment.Floor))
                {
                    sb.AppendLine("Piso: " + shipment.Floor);
                }
                if (!string.IsNullOrEmpty(shipment.Appartament))
                {
                    sb.AppendLine("Departamento: " + shipment.Appartament);
                }
                sb.AppendLine("Código Postal: " + shipment.PostalCode);
                sb.AppendLine("Estado del Envío: " + (shipment.ShipmentState == 0 ? "Pendiente" : "Procesado"));
                if (shipment.TrackingId.HasValue)
                {
                    sb.AppendLine("ID de Seguimiento: " + shipment.TrackingId.Value);
                }
                if (!string.IsNullOrEmpty(shipment.Service))
                {
                    sb.AppendLine("Servicio: " + shipment.Service);
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
            catch(Exception ex)
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

        private async Task DescontarStock(Sale sale)
        {
            foreach(var item in sale.Details)
            {
                var article = item.Article;
                article.Stocks.Find(x => x.Size.Id == item.Size.Id).Amount -= item.Amount;
                await _articleRepository.UpdateArticle(article);
            }
        }

        public async Task<List<SaleResponse>> GetSales(DateTime fechaInicio, DateTime fechaFin, int? clientDoc)
        {
            List<Sale> items;
            if (!clientDoc.HasValue || clientDoc == 0)
                items = await _saleRepository.GetSales(fechaInicio, fechaFin);
            else
                items = await _saleRepository.GetSalesByClient(clientDoc.Value);

            List<SaleResponse> response = _mapper.Map<List<SaleResponse>>(items);

            return response;
        }

        public async Task<SaleResponse> GetSaleById(int id)
        {
            Sale sale = await _saleRepository.GetById(id);

            var response = _mapper.Map<SaleResponse>(sale);

            return response;
        }

        public async Task<SaleResponse> GetSaleByPaymentId(long id)
        {
            Sale sale = await _saleRepository.GetByPaymentId(id);

            var response = _mapper.Map<SaleResponse>(sale);

            return response;
        }

        public async Task UpdateRefundPending(int saleId)
        {
            var sale = await _saleRepository.GetById(saleId);

            sale.RefundPending = false;

            await NotificarClienteFinalizado(sale);

            await _saleRepository.Update(sale);
        }

        private async Task NotificarClienteFinalizado(Sale sale)
        {
            try
            {
                var client = await _clientRepository.GetByDoc(sale.ClientDoc);
                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress("2nf.clothing@gmail.com");
                mail.To.Add(client.User.Email);
                mail.Subject = "Su compra fue cancelada con éxito";

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
                sb.AppendLine();
                sb.AppendLine("Hemos procesado su solicitud de cancelación de compra. Su reembolso por el monto de AR$: " + CalcularTotal(sale.Details) + " fue aprobado.");
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
            catch
            {
                Console.WriteLine("No se pudo enviar el correo");
            }
            
        }
    }
}
