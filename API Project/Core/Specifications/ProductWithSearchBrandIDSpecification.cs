using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithSearchBrandIDSpecification :BaseSpecification<Product>
    {
        public ProductWithSearchBrandIDSpecification(int brandid):base (p => p.ProductBrandId ==brandid)
        {
            
        }
    }
}
