using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Idenity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistance.Services;
using StackExchange.Redis;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseApiController
    {
        UserManager<AppUser> userManger;
        SignInManager<AppUser> signInManager;
        ITokenService tokenService;
        IMapper mapper; 
        public AccountController(UserManager<AppUser> userManger, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            this.userManger = userManger;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManger.FindByEmailAsync(loginDto.Email);
            if (user == null) { return Unauthorized(new ApiResponse(401)); };

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            var roles = await userManger.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.createToken(user),
                DisplayName = user.DisplayName,
                Role = role
            };

        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> register(RegisterDto regUser)
        {
            var user = new AppUser()
            {
                DisplayName = regUser.DisplayName,
                Email = regUser.Email,
                UserName = regUser.Email,
            };
            var result = await userManger.CreateAsync(user, regUser.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            var roles = await userManger.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.createToken(user),
                DisplayName = user.DisplayName,
                Role= role
            };
        }
        [Authorize]
        [HttpGet("currentuser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            //var role = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
            // var user = await userManger.FindByEmailAsync(email);
            var user = await userManger.FindByEmailFromClaimsPrincipal(User);
            var roles = await userManger.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = await tokenService.createToken(user),
                Role= role      
            };
        }
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManger.FindByEmailAsync(email) != null;
        }
        
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            // var user = await userManger.FindByEmailAsync(email);
            var user = await userManger.FindUserByClaimsPrincipleWithAddress(User);
            return mapper.Map<Address, AddressDto>(user.Address);
        }
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await userManger.FindUserByClaimsPrincipleWithAddress(User);
            user.Address = mapper.Map<AddressDto, Address>(address);
            var result = await userManger.UpdateAsync(user);
            if (result.Succeeded) 
            {
                return Ok (mapper.Map<Address,AddressDto>(user.Address)); 
            }
            return BadRequest("didnot update the user");
            
        }

        [Authorize]
        [HttpGet("Role")]
        public  ActionResult<string> GetRoleForUser()
        {
            var role = HttpContext.User.RetrieveRoleFromPrincipal();
            if (role == null) { return NotFound(new ApiResponse(404,"Not Alowed just For Admins")); }
            return Ok(role);
        }
    }
    }
