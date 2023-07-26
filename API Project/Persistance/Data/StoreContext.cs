using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Persistance.Data
{
    public class StoreContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }    
        public DbSet<DeliveryMethod> deliveryMethods { get; set; }  
        public StoreContext()
        {
            
        }
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
             
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
 