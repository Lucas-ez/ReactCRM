using backend.Model;
using backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly UsuarioService _users;
        public AuthController(IConfiguration configuration, UsuarioService usuarioService)
        {
            this.configuration = configuration;
            _users = usuarioService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(Usuario user)
        {
            Console.WriteLine("Entra register");

            _users.AddUpdate(user);

            return Ok(user);
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UsuarioDTO req)
        {
            var user = _users.GetByUsername(req.Username);

            if (user == null || user.Username != req.Username) { 
                return BadRequest("User not found.");
            }

            if (user.Password != req.Password)
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user);
            return Ok(token);
        }

        private string CreateToken(Usuario user)
        {
            List<Claim> claims = new List<Claim>() {
                new Claim("username", user.Username),
                new Claim("name", user.Nombre),
                new Claim("role", user.IsAdminRol ? "Admin" : "User")
            };

            var key = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(
                    configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

    }
}
