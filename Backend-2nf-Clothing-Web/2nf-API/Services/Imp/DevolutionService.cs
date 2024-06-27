using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;

namespace _2nf_API.Services.Imp
{
    public class DevolutionService : IDevolutionService
    {
        private readonly IDevolutionRepository _repository;
        private readonly IShipmentRepository _shipmentRepository;

        private readonly IMapper _mapper;

        public DevolutionService(
            IDevolutionRepository devolutionRepository, 
            IMapper mapper,
            IShipmentRepository shipmentRepository)
        {
            _repository = devolutionRepository;
            _mapper = mapper;
            _shipmentRepository = shipmentRepository;
        }
        public async Task<DevolutionResponse> Create(DevolutionRequest request)
        {
            //validar que no exista una devolucion
            var existentDevolution = await _repository.GetByShipment(request.ShipmentId);
            if (existentDevolution != null) throw new BadHttpRequestException("No puede crear dos devoluciones para un envío");

            var shipment = await _shipmentRepository.GetById(request.ShipmentId);
            var devolution = new Devolution
            {
                ClientDoc = shipment.ClientDoc,
                Reason = request.Reason,
                Shipment = shipment,
                CreatedAt = DateTime.Now,
                State = 0,
                UpdatedAt = DateTime.Now
            };
            var created = await _repository.Save(devolution);

            var response = _mapper.Map<DevolutionResponse>(created);

            return response;
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

            var updated = await _repository.Update(devolution);
            var response = _mapper.Map<DevolutionResponse>(updated);

            return response;
        }
    }
}
