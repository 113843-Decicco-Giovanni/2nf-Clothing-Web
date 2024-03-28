using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetArticles();
        Task<Article> SaveArticle(Article article);
    }
}
