using System;

namespace shop.api.Dtos
{
    public class ProductsDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public int CategoryValue { get; set; }
    }
}