using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity: BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery,ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }
            if (spec.orderBy != null)
            {
                query = query.OrderBy(spec.orderBy);
            }
            if (spec.orderByDescending != null)
            {
                query = query.OrderByDescending(spec.orderByDescending);
            }
            if (spec.IsPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);  
            }

            query = spec.Includes.Aggregate(query, (currnet, include) => currnet.Include(include));
            return query;
        }
    }   
}
