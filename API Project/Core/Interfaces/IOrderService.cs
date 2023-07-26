using Core.Entities.Order;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        public Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress);
        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        public Task<Order> GetOrderByIdAsync(int Id, string buyerEmail);
        public Task<IReadOnlyList<DeliveryMethod>> GetDeliverMethodsAsync();
        public Task<IReadOnlyList<Order>> GetALLOrdersWithOrderItemsAsync();
        public Task<IReadOnlyList<Order>> GetOrderWithOrderItemsAsync(int id);



    }
}
