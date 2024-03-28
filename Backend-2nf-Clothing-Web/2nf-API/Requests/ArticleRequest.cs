namespace _2nf_API.Requests
{
    public class ArticleRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Type { get; set; }
        public List<string> Images { get; set; }
    }
}
