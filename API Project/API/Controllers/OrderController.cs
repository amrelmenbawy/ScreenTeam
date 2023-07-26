using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static NHibernate.Engine.Query.CallableParser;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : BaseApiController
    {
        IOrderService orderService;
        IMapper mapper;
        public OrderController(IOrderService orderService, IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            // Email of Buyer 
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            // Address Mapping  
            var shipToAddress = mapper.Map<AddressDto, Address>(orderDTO.ShipToAddress);
            // call Service Order We need buyerEmail ,deliveryMethodId ,basketId and shippingAddress To create order
            var order = await orderService.CreateOrderAsync(email, orderDTO.DeliveryMethodId, orderDTO.BasketId, shipToAddress);
            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "there is Problem During Creating Order"));
            }
            return Ok(order);
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDTO>>> GetAllOrdersforUser()
        {
            var email = HttpContext.User?.RetrieveEmailFromPrincipal();
            var orders = await orderService.GetOrdersForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDTO>> GetOrderByIdForUser(int id) 
        {
            var email = HttpContext.User?.RetrieveEmailFromPrincipal();
            var order = await orderService.GetOrderByIdAsync(id, email);
            if (order == null ) { return NotFound(new ApiResponse(404)); }
            return Ok(mapper.Map<Order, OrderToReturnDTO>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethods()
        {
            var DeliveryMethods = await orderService.GetDeliverMethodsAsync();
            return Ok(DeliveryMethods);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("AllOrders")]
        public async Task<ActionResult<OrderToReturnDTO>> GetAllOrders()
        {
            var orders = await orderService.GetALLOrdersWithOrderItemsAsync();
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
        }
    }
}

