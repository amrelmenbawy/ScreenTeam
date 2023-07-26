using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;
using FluentNHibernate.Visitors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance.Services
{
    public class OrderService : IOrderService
    {
        IBasketRespository basketrepo;
        IUnitOfWork unitOfWork; 
        public OrderService(IBasketRespository basketrepo, IUnitOfWork unitOfWork) 
        {
            this.basketrepo = basketrepo;  
            this.unitOfWork = unitOfWork;   
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId
            , Address shippingAddress)
        {
            //get basket from the repo 
            var basket = await basketrepo.GetBasketAsync(basketId);
            //get items from the Product Repo 
            var items = new List<OrderItem>();
            foreach (var productinbasket in basket.Item)
            {
                var product = await unitOfWork.Repository<Product>().GetByIdAsync(productinbasket.Id); // i got product now 
                var ItemOrdered = new ProductItemOrdered(product.ID, product.Name, product.imgUrl); // created product item
                var orderitem = new OrderItem(ItemOrdered, product.Price, productinbasket.Quantity);
                items.Add(orderitem);
            }
            //get delivery method from repo 
            var deliveryMethod = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            basket.DeliveryMethodId = deliveryMethod.ID;
            await basketrepo.UpdateBasketAsync(basket);
            //calc subtotal 
            var subtotal = items.Sum(i => i.Quantity * i.Price);
            // problem here 
            Order order = null;
            if (basket.PaymentIntentId !=null)
            {
             var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
             order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec); // order.paymentid=basket.PaymentIntentId
            }
            if (order != null)
            {
                order.ShipToAddress = shippingAddress;  
                order.DeliveryMethod =deliveryMethod;
                order.Subtotal = subtotal;
                unitOfWork.Repository<Order>().Update(order);
            }
            else
            {
                // create orders 
                order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
                // Add Order To Database
                unitOfWork.Repository<Order>().Add(order);
            }
            // save to db  Wait for it
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            // Delete Basket 
            //await basketrepo.DeleteBasketAsync(basketId); 
            //return order
            return order;   
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliverMethodsAsync()
        {
            return await unitOfWork.Repository<DeliveryMethod>().ListAllAsync();    
        }

        public async Task<Order> GetOrderByIdAsync(int Id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(Id, buyerEmail);
            return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);  
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await unitOfWork.Repository<Order>().ListAsync(spec);  
        }
        public async Task<IReadOnlyList<Order>> GetALLOrdersWithOrderItemsAsync()
        {
            var spec = new OrdersWithItemsAndOrderingSpecification();
            return await unitOfWork.Repository<Order>().ListAsync(spec);

        }
        public async Task<IReadOnlyList<Order>> GetOrderWithOrderItemsAsync(int id )
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id);
            return await unitOfWork.Repository<Order>().ListAsync(spec);

        }

    }
}
