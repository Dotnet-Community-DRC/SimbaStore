using System.Formats.Asn1;
using API.Data;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly StoreContext _context;

        public OrdersController(ILogger<OrdersController> logger, StoreContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await _context.Orders
                    .Include(o => o.OrderItems)
                    .Where(order => order.BuyerId == User.Identity.Name)
                    .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            return await _context.Orders
                        .Include(order => order.OrderItems)
                        .Where(order => order.BuyerId == User.Identity.Name && order.Id == id)
                        .FirstOrDefaultAsync();
        }
    }
}