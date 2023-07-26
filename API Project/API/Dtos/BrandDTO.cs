using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BrandDTO
    {
        public int? ID { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
