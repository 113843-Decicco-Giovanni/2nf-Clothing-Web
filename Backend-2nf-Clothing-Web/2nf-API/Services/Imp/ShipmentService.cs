using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using ZstdSharp.Unsafe;

namespace _2nf_API.Services.Imp
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;
        private readonly IMapper _mapper;
        public ShipmentService(IShipmentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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

            var updated = await _repository.Update(shipment);
            var response = _mapper.Map<ShipmentResponse>(updated);

            return response;
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
    }
}
