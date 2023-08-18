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
    public class ServiciosController : ControllerBase
    {
        private readonly CRMDBContext _context;

        public ServiciosController(CRMDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet]
        public IQueryable<Servicio> Get()
        {
            return _context.Servicio.AsQueryable();
        }


        [HttpDelete] 
        public IActionResult Delete([FromODataUri] int key) 
        {
            var servicioToDelete = _context.Servicio.AsQueryable().Where(c => c.IdServicio == key).First();

            if (servicioToDelete == null)
            {
                return NotFound();
            }

            _context.Servicio.Remove(servicioToDelete);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Servicio servicio)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (servicio == null)
            {
                return NoContent();
            }

            _context.Servicio.Add(servicio);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPatch]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<Servicio> servPatch) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Servicio servicioToEdit = _context.Servicio.AsQueryable().Where(c => c.IdServicio == key).First();

            if(servicioToEdit == null)
            {
                return NotFound();
            }

            servPatch.Patch(servicioToEdit);
            _context.Servicio.Update(servicioToEdit);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
