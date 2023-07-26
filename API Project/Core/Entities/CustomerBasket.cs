using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public string  Id { get; set; } //this id is using by Anguler to set unique id for each basket  
        public List<BasketItem> Item { get; set; } = new List<BasketItem>();
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        public CustomerBasket()
        {
            
        }
        public CustomerBasket(string id )
        {
            this.Id = id;   
        }
    }
}
