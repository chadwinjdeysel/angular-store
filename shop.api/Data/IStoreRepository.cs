using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using shop.api.Helpers;
using shop.api.Models;

namespace shop.api.Data
{
    public interface IStoreRepository
    {
        void Add<T>(T entity) where T : class;
        void Edit<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<T> Find<T>(Guid id) where T : class;
        Task<T> Find<T>(string id) where T : class;
        Task<bool> SaveAll();

        Task<List<Product>> GetProducts(ProductParams @params);
        Task<List<Order>> GetOrders();
    }
}