using Core.Idenity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ITokenService
    {
       public Task<string> createToken(AppUser user);
       // public string createToken(AppUser user);

    }
}
