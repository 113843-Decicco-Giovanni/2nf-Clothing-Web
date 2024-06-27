namespace _2nf_API.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int ClientDoc { get; set; }
        public Client? Client { get; set; }
        public List<SaleDetail> Details { get; set; }
        public long PaymentId { get; set; }
        public bool Canceled { get; set; } = false;
    }
}
