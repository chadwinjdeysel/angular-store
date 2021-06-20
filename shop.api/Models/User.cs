using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace shop.api.Models
{
    public class User : IdentityUser
    {
        public virtual List<Order> Orders { get; set; }
        public Role Role { get; set; }
    }

    // done this way for simplicity. We would normally use RoleManager<User> to sign roles.
    public enum Role {
        User = 0,
        Admin = 1
    }
}