using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using shop.api.Models;
using shop.api.Dtos;
using System.Threading.Tasks;

namespace shop.api.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;

        public Seed()
        {
        }

        public Seed(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public static void SeedProducts(AppDbContext context)
        {
            if (!context.Products.Any())
            {
                var productData = System.IO.File.ReadAllText("Data/SeedProducts.json");

                var products = JsonConvert.DeserializeObject<List<Product>>(productData);

                foreach (var product in products)
                {
                    context.Products.Add(product);
                }

                context.SaveChanges();
            }
        }

        public async void SeedUsers(UserManager<User> userManager) {
            if(!userManager.Users.Any()){

                // done this way for simplicity
                List<User> users = new List<User>{
                    new User{UserName="user", Role = Role.User},
                    new User{UserName="admin", Role = Role.Admin}
                };

                foreach(var user in users) {
                    var result = await userManager.CreateAsync(user, "P@ss123");
                }

            }
        }
    }
}