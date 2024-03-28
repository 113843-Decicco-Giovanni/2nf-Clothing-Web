using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    internal class ArticleRepository : IArticleRepository
    {
        private readonly _2nfDbContext _dbContext;
        public ArticleRepository(_2nfDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Article>> GetArticles()
        {
            return await _dbContext.Articles
                .Include(x => x.Images)
                .Include(x => x.Type)
                .ToListAsync();
        }

        public async Task<Article> SaveArticle(Article article)
        {
            try
            {
                var articleType = await _dbContext.ArticleTypes.FindAsync(article.Type.Id);
                article.Type = articleType;
                var result = await _dbContext.Articles.AddAsync(article);
                await _dbContext.SaveChangesAsync();
                return result.Entity;
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
