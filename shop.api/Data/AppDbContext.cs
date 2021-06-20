using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using shop.api.Models;

namespace shop.api.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Product>()
                .Property(e => e.Price)
                .HasConversion<double>();

            builder.Entity<Product>()
                .Property(e => e.Category)
                .HasConversion<int>();

            builder.Entity<User>()
                .Property(e => e.Role)
                .HasConversion<int>();
        }
    }
}