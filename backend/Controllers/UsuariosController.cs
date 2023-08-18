using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
