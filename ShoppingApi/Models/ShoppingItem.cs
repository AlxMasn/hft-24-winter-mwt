namespace ShoppingApi.Models
{
    public class ShoppingItem
    {
        public int Id { get; set; } // Unique Identifier
        public string Name { get; set; } = string.Empty; // Item Name
        public int Amount { get; set; } // Item Amount
    }
}
