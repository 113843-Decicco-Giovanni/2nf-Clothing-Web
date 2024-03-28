using _2nf_API.Entities;
using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IArticleService
    {
        Task<List<ArticleResponse>> GetArticles();
        Task<ArticleResponse> SaveArticle(ArticleRequest request);
    }
}
