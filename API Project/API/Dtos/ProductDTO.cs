using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ProductDTO
    {
        public int? ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string imgUrl { get; set; }
        [Required]
        public int ProductTypeId { get; set; }
        [Required]
        public int ProductBrandId { get; set; }
         public IFormFile imageFile { get; set; }
    }
}
