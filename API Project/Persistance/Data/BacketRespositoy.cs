using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using IDatabase = StackExchange.Redis.IDatabase;

namespace Persistance.Data
{
    public class BacketRespositoy : IBasketRespository
    {
        private IDatabase database;
        public BacketRespositoy(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }
        public async Task<bool> DeleteBasketAsync(string id)
        {
           return await database.KeyDeleteAsync(id);
        }

        public async Task<CustomerBasket> GetBasketAsync(string id)
        {
            var data = await database.StringGetAsync(id);
            if (data.IsNullOrEmpty)
            {
                return null;
            }
            return JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await database.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket),TimeSpan.FromDays(30));
            if (created ==null )
            {
                return null;
            }
            return await GetBasketAsync(basket.Id);
        }
        public async Task<CustomerBasket> UpdateIfitisExistBasketAsync(string key,BasketItem Item)
        {
            var oldbasket = await GetBasketAsync(key);
            if (oldbasket == null) return null;
                oldbasket.Item.Add(Item);
            await DeleteBasketAsync(key);
            var created = await database.StringSetAsync(oldbasket.Id,JsonSerializer.Serialize(oldbasket),TimeSpan.FromDays(30));
            if (created == null)
            {
                return null;
            }
            return await GetBasketAsync(oldbasket.Id);
        }

    }
}
