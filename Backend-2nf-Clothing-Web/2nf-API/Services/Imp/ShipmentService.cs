using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using MySqlX.XDevAPI;
using System.Net.Mail;
using System.Net;
using System.Text;
using ZstdSharp.Unsafe;

namespace _2nf_API.Services.Imp
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ShipmentService(IShipmentRepository repository, IMapper mapper, IConfiguration configuration)
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
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
                var shipment = await _repository.GetById(updated.Id);
                var sale = shipment.Sale;
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
    }
}
