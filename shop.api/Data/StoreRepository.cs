using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using shop.api.Helpers;
using shop.api.Models;

namespace shop.api.Data
{
    public class StoreRepository : IStoreRepository
    {
        private readonly AppDbContext _context;

        public StoreRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetProducts(ProductParams @params)
        {   
            var products = _context.Products.AsQueryable();

            if (@params.Search != null)
                products = products.Where(p => p.Name.ToUpper().Contains(@params.Search.ToUpper())).AsQueryable();

            if(@params.Category != null)
                products = products.Where(p => p.Category == (Category)@params.Category).AsQueryable();

            return await products.ToListAsync();
        }


        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            if (entity != null)
                _context.Remove(entity);
        }

        public void Edit<T>(T entity) where T : class
        {
            _context.Set<T>().Update(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<T> Find<T>(Guid id) where T : class
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _context.Orders.Include(x => x.User).ToListAsync();
        }

        public async Task<T> Find<T>(string id) where T : class
        {
            return await _context.Set<T>().FindAsync(id);
        }
    }
}