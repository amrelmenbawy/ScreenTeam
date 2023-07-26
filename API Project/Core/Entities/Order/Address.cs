using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Address
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public Address()
        {

        }
        public Address(string firstname ,string lastname ,string street , string city , string state , string zipcode  )
        {
            this.Firstname = firstname; 
            this.Lastname = lastname;   
            this.Street = street;   
            this.City = city;
            this.State = state;
            this.ZipCode = zipcode; 
        }
    }
}
