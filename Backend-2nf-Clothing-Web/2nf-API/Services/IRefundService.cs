using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IRefundService
    {
        Task<RefundResponse> Create(RefundRequest request);
        Task<RefundResponse> GetById(int id);
        Task<List<RefundResponse>> Get(int? state, int? clientDoc, DateTime? fechaInicio, DateTime? fechaFin);
        //Task<RefundResponse> TryAgain(int id);
    }
}
