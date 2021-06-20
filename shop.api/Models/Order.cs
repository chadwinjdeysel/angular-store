using System;

namespace shop.api.Models
{
    public class Order
    {   public Order()
        {
            this.OrderPlaced = DateTime.Now;    
        }

        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        public DateTime OrderPlaced { get; set; }
        public decimal OrderTotal { get; set; }
    }
}