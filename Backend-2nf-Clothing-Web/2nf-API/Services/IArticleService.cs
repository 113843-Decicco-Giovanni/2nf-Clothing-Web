using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IArticleService
    {
        Task<List<ArticleResponse>> GetArticles();
        Task<List<ArticleResponse>> GetArticlesWithStock();
        Task<List<ArticleTypeResponse>> GetArticleTypes();
        Task<ArticleResponse> SaveArticle(ArticleRequest request);
        Task<bool> DeleteArticle(int id);
        Task<ArticleResponse> UpdateArticle(int id, ArticleRequest request);
        Task<bool> ActivateArticle(int id);
        Task<ArticleResponse> GetArticleById(int id);
        Task<List<SizeResponse>> GetSizes();
        Task<ArticleResponse> UpdateStock(int id, StockRequest request);
    }
}
