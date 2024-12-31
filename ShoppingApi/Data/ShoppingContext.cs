using Microsoft.EntityFrameworkCore;
using ShoppingApi.Models;

namespace ShoppingApi.Data
{
    public class ShoppingContext : DbContext
    {
        public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options) { }

        public DbSet<ShoppingItem> ShoppingItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Konfiguriert den Primärschlüssel und die automatische ID-Generierung
            modelBuilder.Entity<ShoppingItem>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<ShoppingItem>()
                .Property(s => s.Id)
                .ValueGeneratedOnAdd(); // ID wird automatisch generiert
        }
    }
}
