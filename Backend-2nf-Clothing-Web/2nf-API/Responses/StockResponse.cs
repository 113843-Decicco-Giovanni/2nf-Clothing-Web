using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class StockResponse
    {
        public int Id { get; set; }
        public int Article { get; set; }
        public int Size { get; set; }
        public int Amount { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int LastAmountAdded { get; set; }
    }
}