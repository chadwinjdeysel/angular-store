using System;

namespace shop.api.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Category Category { get; set; }
    }

    // for simplicity
    public enum Category {
        Casual = 0,
        Accesories = 1,
        Active = 2,
        Formal = 3
    }
}