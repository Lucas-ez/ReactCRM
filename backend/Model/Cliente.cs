using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }
        [Required]
        public int DNI { get; set; }
        [Required]
        public string? Nombre { get; set; }
        public string? Telefono { get; set; }
        public string? Mail { get; set; }
        public string? Direccion { get; set; }
        public string? Observaciones { get; set; }
    }
}
