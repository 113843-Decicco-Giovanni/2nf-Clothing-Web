using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IDevolutionService
    {
        Task<DevolutionResponse> Create(DevolutionRequest request);
        Task<DevolutionResponse> UpdateState(int id, int state, string detail);
        Task<List<DevolutionResponse>> Get(int? state, int? dni, DateTime? fechaInicio, DateTime? fechaFin);
        Task<DevolutionResponse> GetById(int id);
        Task<DevolutionResponse> GetByShipmentId(int shipmentId);
    }
}
