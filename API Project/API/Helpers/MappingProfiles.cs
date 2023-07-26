using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Order;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.imgUrl, o => o.MapFrom<ProductUrlResolver>());
            CreateMap<ProductDTO, Product>();
            CreateMap<BrandDTO, ProductBrand>();
            CreateMap<TypeDTO, ProductType>();
            CreateMap<DeliveryMethodDTO, DeliveryMethod>();

            CreateMap<Core.Idenity.Address, AddressDto>().ReverseMap(); 
            CreateMap<CustomerBasket, CustomerBasketDto>().ReverseMap();    
            CreateMap<BasketItem, BasketItemDto>().ReverseMap();
            CreateMap<AddressDto,Address>();

            CreateMap<Order, OrderToReturnDTO>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.price));
            CreateMap<OrderItem, OrderItemDTO>()

                .ForMember(o => o.ProductId, s => s.MapFrom(p => p.ItemOrdered.ProductItemId))
                .ForMember(o => o.ProductName, s => s.MapFrom(p => p.ItemOrdered.ProductName))
                .ForMember(o => o.ImgUrl, s => s.MapFrom(p => p.ItemOrdered.ImgUrl))
                .ForMember(o => o.ImgUrl, s => s.MapFrom<OrderItemUrlResolver>());

            
       



        }
    }
}
