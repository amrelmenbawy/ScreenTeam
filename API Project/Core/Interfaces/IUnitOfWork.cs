using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable // Disposable will return for us Disposal Methode 
    {
       public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity; // this is Method Return IGenericRepository
       public Task<int> Complete(); // referance About what it is Changes in database  Like update delete Edit all crud Opration Happen 
    }
}
