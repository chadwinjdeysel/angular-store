using System;

namespace shop.api.Dtos
{
    public class OrderDto
    {
        public decimal OrderTotal { get; set; }
        public Guid UserId { get; set; }
    }
}