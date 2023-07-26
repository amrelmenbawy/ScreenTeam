using Core.Entities.Order;

namespace API.Dtos
{
    public class OrderToReturnDTO
    {
        public int Id { get; set; }    
        public String BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } 
        public string DeliveryMethod { get; set; }
        public decimal Subtotal { get; set; } 
        public decimal ShippingPrice { get; set; }  
        public Address ShipToAddress { get; set; } // navigation 
        public IReadOnlyList<OrderItemDTO> OrderItems { get; set; }  
        public string status { get; set; } 
        public decimal Total { get; set; }
    }
}
