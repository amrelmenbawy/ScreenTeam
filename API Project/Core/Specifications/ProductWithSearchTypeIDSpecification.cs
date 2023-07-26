using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithSearchTypeIDSpecification : BaseSpecification<Product>
    {
        public ProductWithSearchTypeIDSpecification(int typeid):base(p=> p.ProductTypeId==typeid)
        {
            
        }
    }
}
