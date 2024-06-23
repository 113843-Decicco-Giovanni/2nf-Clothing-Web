namespace _2nf_API.Entities
{
    public class SaleDetail
    {
        public int Id { get; set; }
        public Article Article { get; set; }
        public Size Size { get; set; }
        public int Amount { get; set; }
        public double UnitPrice { get; set; }
    }
}
