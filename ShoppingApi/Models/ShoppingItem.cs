using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingApi.Models
{
    public class ShoppingItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // ID wird automatisch generiert
        public int Id { get; set; } // Unique Identifier
        
        [Required]
        public string Name { get; set; } = string.Empty; // Item Name
        
        [Required]
        public int Amount { get; set; } // Item Amount
    }
}
