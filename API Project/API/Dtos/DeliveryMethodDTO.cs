using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class DeliveryMethodDTO
    {
        public int Id { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public string DeliveryTime { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal price { get; set; }
    }
}
