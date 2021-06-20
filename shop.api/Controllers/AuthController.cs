using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using shop.api.Data;
using shop.api.Dtos;
using shop.api.Models;

namespace shop.api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager,
            IConfiguration config
        )
        {
            _config = config;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserDto model)
        {   
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);

            if(result.Succeeded) {
                var user = await _userManager.FindByNameAsync(model.UserName);

                if(user == null)
                    return NotFound();

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new Claim[]{
                        new Claim("UserId", user.Id.ToString()),
                        new Claim(ClaimTypes.Role, ((Role)user.Role).ToString()),
                        new Claim("Role", ((Role)user.Role).ToString()),
                    },
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signingCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new {
                    Token = tokenString
                });
            }   

            return Unauthorized("User credentials are incorrect");
        }
    }
}