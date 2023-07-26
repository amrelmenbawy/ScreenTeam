using API.Dtos;
using AutoMapper;
using Core.Entities.Order;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDTO, string>
    {
        private readonly IConfiguration _config;
        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
        {
           if(!string.IsNullOrEmpty(source.ItemOrdered.ImgUrl))
            {
                return _config["ApiUrl"] + source.ItemOrdered.ImgUrl;
            }
            return null;
        }
    }
}
