using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class OrderItem :BaseEntity
    {
        public decimal Price { get; set; }  
        public int Quantity { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; } // Owns
        public OrderItem()
        {
            
        }
        public OrderItem( ProductItemOrdered itemOrder, decimal price , int quantity)
        {
            this.ItemOrdered = itemOrder;   
            this.Price = price; 
            this.Quantity = quantity;  
        }

    }
}
