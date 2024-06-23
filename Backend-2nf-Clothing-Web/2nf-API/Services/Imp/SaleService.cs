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
using System.Collections.Generic;
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
                NotificationUrl = "https://c59c-190-120-112-27.ngrok-free.app/api/sale/webhook-payment",
                AutoReturn = "approved",
                BinaryMode = true,
                Payer = payer,
                Shipments = shipment,
                Metadata = new Dictionary<string, object>()
                {
                    { "DNI", payer.Identification.Number }
                },
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

            //await _saleRepository.AddShipmentSale(sale);

            return respuesta;
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
            if (!clientDoc.HasValue)
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
    }
}
