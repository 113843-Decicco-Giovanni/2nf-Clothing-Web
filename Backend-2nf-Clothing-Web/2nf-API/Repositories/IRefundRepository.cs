using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IRefundRepository
    {
        Task<List<Refund>> Get(int? state, int? clientDoc, DateTime? fechaInicio, DateTime? fechaFin);
        Task<List<Refund>> GetNoFinished();
        Task<Refund> GetById(int id);
        Task<Refund> GetBySaleId(int saleId);
        Task<Refund> Save(Refund refund);
        Task<Refund> Update(Refund refund);
    }
}
