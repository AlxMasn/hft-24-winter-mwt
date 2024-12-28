using Microsoft.EntityFrameworkCore;
using ShoppingApi.Models;

namespace ShoppingApi.Data
{
    public class ShoppingContext : DbContext
    {
        public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options) { }

        public DbSet<ShoppingItem> ShoppingItems { get; set; }
    }
}

