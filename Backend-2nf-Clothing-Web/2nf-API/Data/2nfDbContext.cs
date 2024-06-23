
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Data
{
    public class _2nfDbContext : DbContext
    {
        public _2nfDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleType> ArticleTypes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients {  get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SaleDetails { get; set; }
        public DbSet<Shipment> Shipments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>()
                .HasOne(a => a.Type)
                .WithMany();
        }
        public IQueryable<Article> GetArticlesWithStock()
        {
            return Articles.Where(a => a.Stocks.Any(x => x.Amount != 0) && a.DiscontinuedAt == null)
                .Include(x => x.Images)
                .Include(x => x.Type)
                .Include(x => x.Type)
                .Include(x => x.Stocks)
                    .ThenInclude(x => x.Size);
        }
    }
}
