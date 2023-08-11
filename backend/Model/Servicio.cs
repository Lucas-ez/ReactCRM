using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Servicio
    {
        [Key]
        public int IdServicio { get; set; }
        [Required]
        public string? Nombre { get; set; }
    }
}
