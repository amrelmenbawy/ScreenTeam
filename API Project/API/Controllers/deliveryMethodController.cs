using API.Dtos;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Dialect.Function;
using Stripe;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class deliveryMethodController : ControllerBase
    {
        IUnitOfWork _unitOfWork;
        IMapper _mapper;    
        public deliveryMethodController(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;   
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetAllDeliveryMethod()
        {
            return Ok(await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethodID(int id)
        {
            return Ok(await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id));
        }
        [HttpPost]
        public async Task<ActionResult> Create(DeliveryMethodDTO dmDTO)
        {
            var dm = _mapper.Map<DeliveryMethod>(dmDTO);
             _unitOfWork.Repository<DeliveryMethod>().Add(dm);
            var result = await _unitOfWork.Complete();
            if(result<0) { return BadRequest(); }

           return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Update(DeliveryMethodDTO dmDTO)
        {
            var dm = _mapper.Map<DeliveryMethod>(dmDTO);
            _unitOfWork.Repository<DeliveryMethod>().Update(dm);
            var result = await _unitOfWork.Complete();
            if (result < 0) { return BadRequest(); }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dm = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
            if(dm ==null) return BadRequest();  
            _unitOfWork.Repository<DeliveryMethod>().Delete(dm);
            var result = await _unitOfWork.Complete();
            if(result  < 0) { return BadRequest(); }
            return Ok();
        }

    }
}
