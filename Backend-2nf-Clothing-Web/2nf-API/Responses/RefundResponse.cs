using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class RefundResponse
    {
        public int Id { get; set; }
        public int SaleId { get; set; }
        public int ClientDoc {  get; set; }
        public string Reason { get; set; }
        public string State { get; set; }
    }
}
