using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBasketRespository
    {
        public Task<CustomerBasket> GetBasketAsync(string id);
        public Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
        public Task<bool> DeleteBasketAsync (string id);
        public Task<CustomerBasket> UpdateIfitisExistBasketAsync(string key,BasketItem Item);

    }
}
