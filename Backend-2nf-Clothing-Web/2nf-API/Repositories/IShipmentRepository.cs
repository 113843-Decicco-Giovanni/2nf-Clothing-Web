using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IShipmentRepository
    {
        Task<List<Shipment>> GetByState(int state);
        Task<List<Shipment>> GetByClient(int clientDoc);
        Task<Shipment> GetById(int id);
        Task<Shipment> Save(Shipment shipment);
        Task<Shipment> Update(Shipment shipment);
        Task<List<Shipment>> Get(int? estado, DateTime? fechaInicio, DateTime? fechaFin, int? clientDoc);
    }
}
