using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
