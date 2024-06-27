using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using MercadoPago.Client.Payment;
using MercadoPago.Config;

namespace _2nf_API.Services.Imp
{
    public class RefundService : IRefundService
    {
        private readonly IRefundRepository _refundRepository;
        private readonly ISaleRepository _saleRepository;
        private readonly IShipmentRepository _shipmentRepository;
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public RefundService(
            IRefundRepository refundRepository, 
            ISaleRepository saleRepository, 
            IMapper mapper,
            IConfiguration configuration,
            IShipmentRepository shipmentRepository,
            IArticleService articleService
            )
        {
            _refundRepository = refundRepository;
            _saleRepository = saleRepository;
            _mapper = mapper;
            _configuration = configuration;
            _shipmentRepository = shipmentRepository;
            _articleService = articleService;
        }

        public async Task<RefundResponse> Create(RefundRequest request)
        {
            MercadoPagoConfig.AccessToken = _configuration.GetValue<string>("Token");

            var sale = await _saleRepository.GetById(request.SaleId);
            var shipment = await _shipmentRepository.GetBySaleId(request.SaleId);
            var existentRefund = await _refundRepository.GetBySaleId(request.SaleId);
            if (shipment.ShipmentState == 1 || shipment.ShipmentState == 2) throw new BadHttpRequestException("El envío debe estar pendiente o cancelado");
            if (sale.Canceled || existentRefund != null) throw new BadHttpRequestException("Ya existe un reembolso o la venta está cancelada");

            var refundClient = new PaymentRefundClient();

            var refundResponse = await refundClient.RefundAsync(sale.PaymentId);

            if(refundResponse.ApiResponse.StatusCode == 200 || refundResponse.ApiResponse.StatusCode == 201)
            {
                var refund = new Refund
                {
                    RefundId = refundResponse.Id.Value,
                    ClientDoc = sale.ClientDoc,
                    CreatedAt = DateTime.Now,
                    Reason = request.Reason,
                    Sale = sale,
                    State = 0
                };
                Refund refundUpdated = await ActualizarEntidadesSegunEstado(refundResponse.Status,  refund, shipment, sale);

                var refundCreated = await _refundRepository.Save(refundUpdated);

                NotificarCliente(refundCreated);

                var response = _mapper.Map<RefundResponse>(refundCreated);

                return response;
            }
            throw new Exception("No se pudo procesar el reembolso por un error con MercadoPago");
        }

        private void NotificarCliente(Refund refundCreated)
        {
            throw new NotImplementedException();
        }

        private async Task<Refund> ActualizarEntidadesSegunEstado(string status, Refund refund, Shipment shipment, Sale sale)
        {
            if (status == "approved")
            {
                refund.State = 2;
                refund.UpdatedAt = DateTime.Now;
                sale.Canceled = true;
                ActualizarStock(sale);
            }
            if (status == "authorized" || status == "in_process")
            {
                refund.State = 1;
            }
            if (status == "cancelled" || status == "rejected")
            {
                refund.State = 0;
            }
            shipment.ShipmentState = 3;

            await _shipmentRepository.Update(shipment);
            await _saleRepository.Update(sale);

            return refund;
        }

        private async void ActualizarStock(Sale sale)
        {
            foreach(var detail in sale.Details)
            {
                var stock = new StockRequest
                {
                    Size = detail.Size.Id,
                    Amount = detail.Amount
                };
                await _articleService.UpdateStock(detail.Article.Id, stock);
            }
        }

        private void EnviarCorreo(Refund refund, Sale sale)
        {
            throw new NotImplementedException();
        }

        public Task<RefundResponse> Get(int? state, int? clientDoc, DateTime fechaInicio, DateTime fechaFin)
        {
            throw new NotImplementedException();
        }

        public Task<RefundResponse> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<RefundResponse>> TryAgain(int id)
        {
            throw new NotImplementedException();
        }
    }
}
