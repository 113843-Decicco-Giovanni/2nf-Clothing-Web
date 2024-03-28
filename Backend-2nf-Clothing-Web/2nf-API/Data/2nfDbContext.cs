
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>()
                .HasOne(a => a.Type)
                .WithMany();
        }
    }
}
