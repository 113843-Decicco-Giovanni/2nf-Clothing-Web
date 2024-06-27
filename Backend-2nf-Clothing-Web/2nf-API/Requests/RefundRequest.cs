namespace _2nf_API.Requests
{
    public class RefundRequest
    {
        public int SaleId { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
