using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Usuario
    {
        [Key]
        public string? Username { get; set; }

        [Required]
        public string? Nombre { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public bool IsAdminRol { get; set; }
    }
}
