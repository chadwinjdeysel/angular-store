using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using shop.api.Data;
using shop.api.Dtos;
using shop.api.Helpers;
using shop.api.Models;

namespace shop.api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin", AuthenticationSchemes = "Bearer")]
    public class ProductsController : ControllerBase {
        private readonly IStoreRepository _repo;

        public ProductsController(IStoreRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery]string search, [FromQuery]int? category) {

            ProductParams @params = new ProductParams();
            @params.Search = search;
            @params.Category = category;
            
            var products = await _repo.GetProducts(@params);

            var productsToReturn = new List<ProductsDto>();

            foreach(var product in products) {
                productsToReturn.Add(new ProductsDto{
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    Category = product.Category.ToString(),
                    CategoryValue = (int)product.Category
                });
            }
            
            return Ok(productsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("categories")]
        public IActionResult GetCategories(){
            var categoriesToReturn = new List<CategoriesDto>();

            foreach(var category in Enum.GetValues(typeof(Category))) {
                categoriesToReturn.Add(new CategoriesDto{
                    Name = category.ToString(),
                    Value = (int)category
                });
            };

            return Ok(categoriesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromQuery]Guid id){
            var product = await _repo.Find<Product>(id);

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody]ProductsDto product) {
            if(product == null)
                return BadRequest("Product is not valid");

            var productToAdd = new Product() {
                Id = Guid.NewGuid(),
                Name = product.Name,
                Price = product.Price,
                Category = (Category)product.CategoryValue
            };  

            _repo.Add<Product>(productToAdd);

            if(await _repo.SaveAll()){
                product.Category = ((Category)product.CategoryValue).ToString();
                product.Id = productToAdd.Id;
                return Ok(product);
            }
                

            return BadRequest("Failed to add product");
        }

        [HttpPut]
        public async Task<IActionResult> EditProduct([FromBody]ProductsDto product) {
            if(product == null || product.Id == Guid.Empty)
                return BadRequest("Product is not valid");

            var productToEdit = new Product() {
                Id = product.Id.Value,
                Name = product.Name,
                Price = product.Price,
                Category = (Category)product.CategoryValue
            };  

            _repo.Edit<Product>(productToEdit);

            if (await _repo.SaveAll()){
                product.Category = ((Category)product.CategoryValue).ToString();
                return Ok(product);
            }
                

            return BadRequest("Failed to update product");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id) {
            if(id == Guid.Empty)
                return BadRequest("Product Id can't be empty");

            var productToDelete = await _repo.Find<Product>(id);

            if(productToDelete == null)
                return NotFound();

            _repo.Delete<Product>(productToDelete);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete product");
        }
    }
}