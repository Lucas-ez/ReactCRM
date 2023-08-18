using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;

namespace backend.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ClientesController : ControllerBase
    {

        private readonly CRMDBContext _context;

        public ClientesController(CRMDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet]
        public IQueryable<Cliente> Get()
        {
            return _context.Cliente.AsQueryable();
        }

        [HttpDelete]
        public IActionResult Delete([FromODataUri] int key)
        {
            var clienteToDelete = _context.Cliente.AsQueryable().Where(c => c.IdCliente == key).First();

            if (clienteToDelete == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(clienteToDelete);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (cliente == null)
            {
                return NoContent();
            }

            _context.Cliente.Add(cliente);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPatch]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<Cliente> clientePatch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cliente clienteToEdit = _context.Cliente.AsQueryable().Where(c => c.IdCliente == key).First();

            if (clienteToEdit == null)
            {
                return NotFound();
            }

            clientePatch.Patch(clienteToEdit);
            _context.Cliente.Update(clienteToEdit);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
