using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Repositories.Imp;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace _2nf_API.Services.Imp
{
    public class DevolutionService : IDevolutionService
    {
        private readonly IDevolutionRepository _repository;
        private readonly IShipmentRepository _shipmentRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public DevolutionService(
            IDevolutionRepository devolutionRepository,
            IMapper mapper,
            IShipmentRepository shipmentRepository,
            IConfiguration configuration,
            IClientRepository clientRepository)
        {
            _repository = devolutionRepository;
            _mapper = mapper;
            _shipmentRepository = shipmentRepository;
            _configuration = configuration;
            _clientRepository = clientRepository;
        }
        public async Task<DevolutionResponse> Create(DevolutionRequest request)
        {
            //validar que no exista una devolucion
            var existentDevolution = await _repository.GetByShipment(request.ShipmentId);
            if (existentDevolution != null && existentDevolution.State != 3) throw new BadHttpRequestException("No puede crear dos devoluciones para un envío");

            var shipment = await _shipmentRepository.GetById(request.ShipmentId);
            shipment.ShipmentState = 2;

            var updatedShipment = await _shipmentRepository.Update(shipment);

            var devolution = new Devolution
            {
                ClientDoc = shipment.ClientDoc,
                Reason = request.Reason,
                Shipment = updatedShipment,
                CreatedAt = DateTime.Now,
                State = 0,
                UpdatedAt = DateTime.Now
            };
            var created = await _repository.Save(devolution);

            await NotificarCliente(created);

            var response = _mapper.Map<DevolutionResponse>(created);

            return response;
        }

        private async Task NotificarCliente(Devolution created)
        {
            var client = await _clientRepository.GetByDoc(created.Shipment.ClientDoc);
            // Configuración del mensaje de correo
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("2nf.clothing@gmail.com");
            mail.To.Add(client.User.Email);
            mail.Subject = "Se ha creado la solicitud de devolución";

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
            sb.AppendLine();
            sb.AppendLine("Hemos recibid su solicitud de devolución de compra.");
            sb.AppendLine("Será contactado por este medio a la brevedad");
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

        public async Task<List<DevolutionResponse>> Get(int? state, int? dni, DateTime? fechaInicio, DateTime? fechaFin)
        {
            List<Devolution> devolutions = await _repository.Get(state, dni, fechaInicio, fechaFin);

            var response = _mapper.Map<List<DevolutionResponse>>(devolutions);

            return response;
        }

        public async Task<DevolutionResponse> GetById(int id)
        {
            var devolution = await _repository.GetById(id);

            var response = _mapper.Map<DevolutionResponse>(devolution);

            return response;
        }

        public async Task<DevolutionResponse> GetByShipmentId(int shipmentId)
        {
            var devolution = await _repository.GetByShipment(shipmentId);

            var response = _mapper.Map<DevolutionResponse>(devolution);

            return response;
        }

        public async Task<DevolutionResponse> UpdateState(int id, int state, string detail)
        {
            var devolution = await _repository.GetById(id);

            devolution.State = state;
            devolution.Detail = detail;
            devolution.UpdatedAt = DateTime.Now;

            if (state == 2) 
            {
                devolution.Shipment.ShipmentState = 3;
                devolution.Shipment.Sale.Canceled = true;
                devolution.Shipment.Sale.RefundPending = true;

                devolution.Shipment.Sale = DevolverStock(devolution.Shipment.Sale);
            }

            var updated = await _repository.Update(devolution);

            var response = _mapper.Map<DevolutionResponse>(updated);

            return response;
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
