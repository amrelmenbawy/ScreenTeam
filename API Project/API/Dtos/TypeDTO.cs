using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class TypeDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
