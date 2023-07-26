using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        IBasketRespository baskrepo ;
        IMapper mapper; 
        public BasketController(IBasketRespository baskrepo , IMapper mapper)
        {
            this.baskrepo = baskrepo;
            this.mapper = mapper;   
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> Get(string id )
        {
            var bassket =await baskrepo.GetBasketAsync(id);
            return Ok(bassket ?? new CustomerBasket(id));
        }
        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var mybasket = mapper.Map<CustomerBasket>(basket);
            var basketupdate = await baskrepo.UpdateBasketAsync(mybasket);
            return Ok(basketupdate);
        }
        [HttpDelete]
        public async Task DeleteBasketAsync(string id )
        {
            await baskrepo.DeleteBasketAsync(id);
        }
        [HttpPut]
        public async Task<ActionResult<CustomerBasket>> UpdateIFExist(string Key, BasketItemDto item)
        {
            var myitem = mapper.Map<BasketItem>(item);
            var basketupdaet = await baskrepo.UpdateIfitisExistBasketAsync(Key, myitem);
            return Ok(basketupdaet);
        }
    }
}
