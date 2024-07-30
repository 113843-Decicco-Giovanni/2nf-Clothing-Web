using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface ISaleRepository
    {
        Task<Sale> GetById(int id);
        Task<Sale> GetByPaymentId(long id);
        Task<List<Sale>> GetSales(DateTime fechaInicio, DateTime fechaFin);
        Task<List<Sale>> GetSalesByClient(int value);
        Task<Sale> Save(Sale sale);
        Task<Sale> Update(Sale sale);

    }
}
