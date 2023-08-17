using backend.Model;

namespace backend.Service
{
    public class UsuarioService
    {
        private readonly CRMDBContext _context;

        public UsuarioService(CRMDBContext context)
        {
            _context = context;
        }

        public List<Usuario> GetAll()
        {
            try
            {
                return _context.Usuario.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return null;
            }
        }

        public Usuario GetByUsername(string username)
        {
            try
            {
                return _context.Usuario.Find(username);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }

        public bool AddUpdate(Usuario usuario)
        {
            try
            {
                if (_context.Usuario.ToList().IndexOf(usuario) == -1)
                {
                    _context.Usuario.Add(usuario);
                }
                else
                {
                    _context.Usuario.Update(usuario);
                }
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        public bool Delete(Usuario usuario)
        {
            try
            {
                _context.Usuario.Remove(usuario);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
