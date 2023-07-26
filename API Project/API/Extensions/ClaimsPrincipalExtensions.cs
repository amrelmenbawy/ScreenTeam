using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static String RetrieveEmailFromPrincipal (this ClaimsPrincipal user)
        {
            //User?.Claims?.FirstOrDefault(c=>c.Type==ClaimTypes.Email)?.Value;
            return user?.Claims?.FirstOrDefault(c=>c.Type == ClaimTypes.Email)?.Value;
        }
        public static String RetrieveRoleFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        }
    }
}
