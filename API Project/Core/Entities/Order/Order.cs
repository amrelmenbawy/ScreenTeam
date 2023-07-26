using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Order : BaseEntity
    {
        public String BuyerEmail { get; set; } // user who will ask for order 
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal Subtotal { get; set; } // it comes from OrderItems itemPrice * itemQuantity
        public DeliveryMethod DeliveryMethod { get; set; } // navigation  for DeliveryMethod
        public Address ShipToAddress { get; set; } // Owns  Address For spcifiec Order It is not Dependes on User Address Because it is all order For user have the same place for it 
        public IReadOnlyList<OrderItem> OrderItems { get; set; }  // navigation for order items 
        public OrderStatus status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; } 

        public Order()
        {
            
        }
        public Order(List<OrderItem> orderItems, string buyerEmail , Address shipTOAdress , DeliveryMethod deliveryMethod , decimal subtotal , string paymentIntentId)
        {
            this.BuyerEmail = buyerEmail;   
            this.ShipToAddress= shipTOAdress;   
            this.DeliveryMethod = deliveryMethod;
            this.OrderItems = orderItems;   
            this.Subtotal = subtotal;
            this.PaymentIntentId = paymentIntentId;
            
        }

        public decimal GetTotal()
        {
            return this.Subtotal + this.DeliveryMethod.price;
        }
    }
}
