using _2nf_Application.Services;
using _2nf_Domain.Entities;
using _2nf_Infraestructure.Repositories;

namespace _2nf_Domain.Services.Imp
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        public ArticleService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public List<Article> getArticles()
        {
            
        }
    }
}
