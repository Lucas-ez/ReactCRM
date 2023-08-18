using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
