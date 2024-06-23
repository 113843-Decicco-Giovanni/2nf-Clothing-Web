using _2nf_API.Entities;
using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface ISaleService
    {
        Task<PreferenceResponse> CreatePreference(CreatePreferenceRequest request);
        Task<PaymentStatusResponse> GetPaymentStatus(long paymentId);
        Task<SaleResponse> GetSaleById(int id);
        Task<List<SaleResponse>> GetSales(DateTime fechaInicio, DateTime fechaFin, int? clientDoc);
        Task<Sale> ReadWebHook(HttpRequest request);
    }
}
