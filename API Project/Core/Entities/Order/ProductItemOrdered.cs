using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class ProductItemOrdered
    {
        public int ProductItemId { get; set; }  
        public string ProductName { get; set; }
        public string ImgUrl { get; set; }

        public ProductItemOrdered()
        {
            
        }
        public ProductItemOrdered(int productItemId , string productName , string imgUrl )
        {
            this.ProductItemId = productItemId ;    
            this.ProductName = productName ;
            this.ImgUrl = imgUrl ;  
        }
    }
}
