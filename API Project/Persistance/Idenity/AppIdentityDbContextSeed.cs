using Core.Idenity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Persistance.Idenity
{
    public  class AppIdentityDbContextSeed
    {
       
        public static async Task seedUserAsync(UserManager<AppUser> userManager , RoleManager<IdentityRole> roleManager)
        {
            if(!userManager.Users.Any())
            {
                AppUser user = new AppUser()
                {
                    DisplayName = "Amr",
                    Email = "amr.elmenbawy@yahoo.com",
                    UserName = "amr.elmenbawy@yahoo.com",
                    Address = new Address
                    {
                        Firstname = "Amr",
                        Lastname = "Elmenbawy",
                        Street = "Elbadly",
                        City = "Mansoura",
                        State = "EG",
                        ZipCode = "13150",
                    }
                };
                await userManager.CreateAsync(user,"AMRahmed123#");
                IdentityRole userRole = new IdentityRole();
                userRole.Name = "Admin";
                userRole.Id = "role";
                await roleManager.CreateAsync(userRole);
                await userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "Admin"));
                await userManager.AddToRoleAsync(user, "Admin");
            }

        }
    }
}
