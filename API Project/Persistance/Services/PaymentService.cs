using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;
using FluentNHibernate.Visitors;
using Microsoft.Extensions.Configuration;
using Persistance.Data;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Product = Core.Entities.Product;

namespace Persistance.Services
{
    public class PaymentService : IPaymentService
    {
        IUnitOfWork unitofwork;
        IBasketRespository basketrepo;
        IConfiguration config;
        public PaymentService(IUnitOfWork unitofwork , IBasketRespository basketrepo ,IConfiguration config )
        {
            this.unitofwork = unitofwork;   
            this.basketrepo= basketrepo;    
            this.config = config;   
        }
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketid )
        {
            StripeConfiguration.ApiKey = config["Stripesettings:Secretkey"]; // Connection with Stripe
            var basket = await basketrepo.GetBasketAsync(basketid);
            if(basket ==null) return null;
            var shipppingPrice = 0m; 
           if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await unitofwork.Repository<DeliveryMethod>().GetByIdAsync((int)basket.DeliveryMethodId);
                shipppingPrice = deliveryMethod.price;
            }
            foreach (var item in basket.Item)
            {
                var product = await unitofwork.Repository<Product>().GetByIdAsync(item.Id);
                if(item.Price != product.Price)
                {
                    item.Price = product.Price;
                }
            }
            var service = new PaymentIntentService();  // Strie Opject 
            PaymentIntent intent;
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount =(long) basket.Item.Sum(i => i.Quantity*(i.Price*100)) +(long) shipppingPrice *100 ,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> {"card"}
                };
                intent = await service.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                // update order Payment intent
                //var order =await unitofwork.Repository<Order>().GetByIdAsync(orderid);
                //order.PaymentIntentId= intent.Id;
                //unitofwork.Repository<Order>().Update(order);
                //await unitofwork.Complete();

                basket.ClientSecret = intent.ClientSecret;  
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)basket.Item.Sum(i => i.Quantity * (i.Price * 100)) + (long)shipppingPrice * 100,
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            await basketrepo.UpdateBasketAsync(basket);
            return basket;
        }
        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await unitofwork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;
            order.status = OrderStatus.PaymentFailed;
            await unitofwork.Complete();

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await unitofwork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;
            order.status = OrderStatus.PaymentReceived;
            await unitofwork.Complete();

            return order;
        }



    }
}
