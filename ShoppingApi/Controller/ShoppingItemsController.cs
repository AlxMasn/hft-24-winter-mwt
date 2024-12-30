using Microsoft.AspNetCore.Mvc;
using ShoppingApi.Data;
using ShoppingApi.Models;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace ShoppingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingItemsController : ControllerBase
    {
        private readonly ShoppingContext _context;
        private readonly ILogger<ShoppingItemsController> _logger; // Logger

        public ShoppingItemsController(ShoppingContext context, ILogger<ShoppingItemsController> logger) // Logger im Konstruktor
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetShoppingItems()
        {
            _logger.LogInformation("GetShoppingItems aufgerufen"); // Wichtiger Log
            try
            {
                var items = await _context.ShoppingItems.ToListAsync();
                _logger.LogInformation($"Anzahl der Items: {items.Count}"); // Anzahl loggen
                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fehler beim Abrufen der Items"); // Fehler loggen
                return StatusCode(500, "Interner Serverfehler");
            }
        }

        // GET: api/ShoppingItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingItem>> GetShoppingItem(int id)
        {
            var item = await _context.ShoppingItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/ShoppingItems
        [HttpPost]
        public async Task<ActionResult<ShoppingItem>> PostShoppingItem(ShoppingItem item)
        {
            _context.ShoppingItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingItem), new { id = item.Id }, item);
        }

        // PUT: api/ShoppingItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShoppingItem(int id, ShoppingItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/ShoppingItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingItem(int id)
        {
            var item = await _context.ShoppingItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.ShoppingItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShoppingItemExists(int id)
        {
            return _context.ShoppingItems.Any(e => e.Id == id);
        }
    }
}
