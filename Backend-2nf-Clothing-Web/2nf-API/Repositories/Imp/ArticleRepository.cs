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

        public async Task<bool> ActivateArticle(int id)
        {
            var article = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
            if (article == null)
            {
                throw new NullReferenceException();
            }
            article.DiscontinuedAt = null;
            _dbContext.Articles.Update(article);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteArticle(int id)
        {
            var article = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
            if (article != null)
            {
                article.DiscontinuedAt = DateTime.Now;
                _dbContext.Articles.Update(article);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Article>> GetArticles()
        {
            return await _dbContext.Articles
                .Include(x => x.Images)
                .Include(x => x.Type)
                .Include(x => x.Stocks)
                    .ThenInclude(x => x.Size)
                .OrderBy(x => x.DiscontinuedAt)
                .ToListAsync();
        }

        public async Task<List<Article>> GetArticlesWithStock()
        {
            return await _dbContext.GetArticlesWithStock().ToListAsync();
        }

        public async Task<List<ArticleType>> GetArticleTypes()
        {
            return await _dbContext.ArticleTypes.ToListAsync();
        }

        public async Task<Article> GetById(int id)
        {
            var article = await _dbContext.Articles
                .Include(x => x.Images)
                .Include(x => x.Stocks)
                    .ThenInclude(x => x.Size)
                .Include(x => x.Type)
                .FirstOrDefaultAsync(x => x.Id == id);
            if(article != null)
            {
                return article;
            }
            throw new NullReferenceException("No existe un articulo con este id");
        }

        public async Task<Article> SaveArticle(Article article)
        {
            try
            {
                var articleType = await _dbContext.ArticleTypes.FindAsync(article.Type.Id);
                article.Type = articleType;
                foreach(var stock in article.Stocks)
                {
                    var size = await _dbContext.Sizes.FirstOrDefaultAsync(x => x.Id == stock.Size.Id);
                    stock.Size = size;
                }
                var result = await _dbContext.Articles.AddAsync(article);
                await _dbContext.SaveChangesAsync();
                return result.Entity;
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<Article> UpdateArticle(Article article)
        {
            var articleType = await _dbContext.ArticleTypes.FindAsync(article.Type.Id);
            article.Type = articleType;
            foreach (var stock in article.Stocks)
            {
                var size = await _dbContext.Sizes.FirstOrDefaultAsync(x => x.Id == stock.Size.Id);
                stock.Size = size;
            }
            var result = _dbContext.Articles.Update(article);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<List<Size>> GetSizes()
        {
            var stocks = await _dbContext.Sizes.ToListAsync();
            if (stocks.Count != 0)
            {
                return stocks;
            }
            throw new ArgumentException();
        }

        public async Task<Size> GetSizeById(int id)
        {
            var size = await _dbContext.Sizes.FirstOrDefaultAsync(x => x.Id == id);
            if(size != null)
            {
                return size;
            }
            throw new NullReferenceException();
        }

        public async Task<Stock> UpdateStock(Stock stock)
        {
            var updated = _dbContext.Stocks.Update(stock);
            await _dbContext.SaveChangesAsync();
            return updated.Entity;
        }
    }
}
