using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.ShipToAddress,i => 
            {
                i.WithOwner(); 
            });
            builder.Navigation(a => a.ShipToAddress).IsRequired();
           
            builder.Property(o => o.status)
                .HasConversion(
                   s=> s.ToString(),
                   s=>(OrderStatus)Enum.Parse(typeof(OrderStatus),s)
                   );
            builder.HasMany(o=>o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);    
        }
    }
}
