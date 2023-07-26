using Core.Entities;
using Core.Interfaces;
using Microsoft.Identity.Client.Extensibility;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        StoreContext storecontext;
        Hashtable repositories;
        public UnitOfWork( StoreContext storecontext)
        {
            this.storecontext = storecontext;   
        }

        public async Task<int> Complete()
        {
            return await storecontext.SaveChangesAsync();   
        }

        public void Dispose()
        {
            storecontext.Dispose();     
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (repositories == null) 
            {
                repositories = new Hashtable(); 
            }
            var type = typeof(TEntity).Name;
            if (!repositories.ContainsKey(type)) 
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType
                    (typeof(TEntity)), storecontext);

                repositories.Add(type, repositoryInstance); 
            }

            return (IGenericRepository<TEntity>)repositories[type]; 
        }
    }
}
