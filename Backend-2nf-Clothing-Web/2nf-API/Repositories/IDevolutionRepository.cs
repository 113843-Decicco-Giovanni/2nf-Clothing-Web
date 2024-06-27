using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IDevolutionRepository
    {
        Task<Devolution> GetByShipment(int shipmentId);
        Task<Devolution> GetById(int id);
        Task<Devolution> Save(Devolution devolution);
        Task<Devolution> Update(Devolution devolution);
        Task<List<Devolution>> Get(int? state, int? dni, DateTime? fechaInicio, DateTime? fechaFin);
    }
}
