using _2nf_API.Data;
using _2nf_Domain.Entities;
using _2nf_Infraestructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _2nf_Domain.Repositories.Imp
{
    internal class ArticleRepository : IArticleRepository
    {
        private readonly _2nfDbContext _dbContext;
        public ArticleRepository(_2nfDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Article> getArticles()
        {
            return _dbContext.Articles.ToListAsync();
        }
    }
}
