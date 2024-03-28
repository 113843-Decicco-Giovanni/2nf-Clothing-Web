using _2nf_Domain.Entities;

namespace _2nf_Infraestructure.Repositories
{
    public interface IArticleRepository
    {
        List<Article> getArticles();
    }
}
