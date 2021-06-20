using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using shop.api.Data;
using shop.api.Models;
using System.Collections.Generic;
using shop.api.Dtos;

namespace shop.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;
        private readonly UserManager<User> _userManager;

        public OrdersController(
            IStoreRepository storeRepository,
            UserManager<User> userManager
        )
        {
            _storeRepository = storeRepository;
            _userManager = userManager;
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User, Admin")]
        [HttpPost]
        public async Task<IActionResult> PlaceOrder(OrderDto model) {

            var result = await _storeRepository.Find<User>(model.UserId.ToString());

            if(result == null)
                return Unauthorized();

            var order = new Order();

            order.UserId = model.UserId;
            order.OrderTotal = model.OrderTotal;

            _storeRepository.Add<Order>(order);

            if(await _storeRepository.SaveAll())
                return NoContent();

             return BadRequest();
        }

        [HttpGet]
        [Authorize(Roles = "Admin", AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetOrders() {
            var orders = await _storeRepository.GetOrders();

            foreach(var order in orders) {
                order.User = await _storeRepository.Find<User>(order.UserId.ToString());
            }
            
            return Ok(orders);
        }
    }
}