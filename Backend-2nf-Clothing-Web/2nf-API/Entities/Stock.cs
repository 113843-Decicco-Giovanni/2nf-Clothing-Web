namespace _2nf_API.Entities
{
    public class Stock
    {
        public int Id { get; set; }
        public Article Article { get; set; }
        public Size Size { get; set; }
        public int Amount { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int LastAmountAdded {  get; set; }
    }
}
