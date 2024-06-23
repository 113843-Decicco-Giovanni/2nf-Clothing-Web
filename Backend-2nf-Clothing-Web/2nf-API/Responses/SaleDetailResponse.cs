using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class SaleDetailResponse
    {
        public ArticleResponse Article { get; set; }
        public SizeResponse Size { get; set; }
        public int Amount { get; set; }
        public double UnitPrice { get; set; }
    }
}
