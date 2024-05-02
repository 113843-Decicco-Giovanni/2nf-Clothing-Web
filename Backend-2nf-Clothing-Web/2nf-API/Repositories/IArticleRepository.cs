using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetArticles();
        Task<List<Article>> GetArticlesWithStock();
        Task<Article> SaveArticle(Article article);
        Task<List<ArticleType>> GetArticleTypes();
        Task<bool> DeleteArticle(int id);
        Task<Article> UpdateArticle(Article article);
        Task<bool> ActivateArticle(int id);
        Task<Article> GetById(int id);
        Task<List<Size>> GetSizes();
        Task<Size> GetSizeById(int size);
    }
}
