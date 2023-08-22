using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;

namespace backend.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly CRMDBContext _context;

        public UsuariosController(CRMDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet]
        public IQueryable<Usuario> Get()
        {
            return _context.Usuario.AsQueryable();
        }

        [HttpDelete]
        public IActionResult Delete([FromODataUri] string key) 
        {
            var userToDelete = _context.Usuario.AsQueryable()
                .Where(u => u.Username == key).First();

            if(userToDelete == null)
            {
                return NotFound();
            }

            try
            {
                _context.Usuario.Remove(userToDelete);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(usuario == null)
            {
                return NoContent();
            }

            try
            {
                _context.Usuario.Add(usuario);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest();
            }
        }
    }
}
