namespace _2nf_API.Responses
{
    public class SaleResponse
    {
        public int Id {  get; set; }
        public DateTime Date { get; set; }
        public ClientResponse Client { get; set; }
        public List<SaleDetailResponse> Details { get; set; }
        public long PaymentId { get; set; }
    }
}
