using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Service
{
    public class ContratoService
    {
        private readonly CRMDBContext _context;

        public ContratoService(CRMDBContext context)
        {
            _context = context;
        }

        public IQueryable<Contrato> GetAll()
        {
            return _context.Contrato
                .Include(c => c.Cliente)
                .Include(c => c.Servicio)
                .AsQueryable();
        }

        public IQueryable<Contrato> GetById(int id)
        {
            return _context.Contrato
                .Include(c => c.Cliente)
                .Include(c => c.Servicio)
                .AsQueryable()
                .Where(c => c.IdContrato == id);
        }

        public void Create(Contrato contrato)
        {
            _context.Contrato.Add(contrato);
            _context.SaveChanges();
        }

        public void Update(Contrato contrato)
        {
            _context.Contrato.Update(contrato); 
            _context.SaveChanges();
        }

        public void Delete(Contrato contrato) 
        {
            _context.Contrato.Remove(contrato); 
            _context.SaveChanges();
        }
    }
}
