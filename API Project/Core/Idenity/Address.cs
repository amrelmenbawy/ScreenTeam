using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Idenity
{
    public class Address
    {
       public int Id { get; set; }  
       public string Firstname { get; set; }
       public string Lastname { get; set; }
       public string Street { get; set; } 
       public string City { get; set; }
       public string State { get; set; }
       public string ZipCode { get; set; }
       public string AppUserId { get; set; }
       public AppUser AppUser { get; set;} // navgation property   
 
    }   
}
