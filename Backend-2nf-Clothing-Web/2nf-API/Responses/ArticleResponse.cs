namespace _2nf_API.Responses
{
    public class ArticleResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Type { get; set; }
        public List<string> Images { get; set; }
        public List<StockResponse> Stocks { get; set; }
        public DateTime? DiscontinuedAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
