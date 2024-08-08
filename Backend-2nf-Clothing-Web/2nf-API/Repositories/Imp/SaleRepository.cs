using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class SaleRepository : ISaleRepository
    {
        private readonly _2nfDbContext _context;

        public SaleRepository( _2nfDbContext context )
        {
            _context = context;
        }

        public async Task<Sale> GetById(int id)
        {
            var sale = await _context.Sales
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Size)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Type)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Stocks)
                            .ThenInclude(x => x.Size)
                .Include(x => x.Client)
                .FirstOrDefaultAsync(x => x.Id == id);

            return sale;
        }

        public async Task<Sale> GetByPaymentId(long id)
        {
            var sale = await _context.Sales
                .Include(x => x.Client)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Size)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Stocks)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Type)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(x => x.PaymentId == id);

            return sale; 
        }

        //public async Task AddShipmentSale(Sale sale)
        //{
        //    var shipment = await _context.Shipments.FirstOrDefaultAsync(x => x.Id == sale.Shipment.Id);
        //    shipment.Sale = sale;

        //    _context.Update(shipment);
        //    await _context.SaveChangesAsync();
        //}

        public async Task<List<Sale>> GetSales(DateTime fechaInicio, DateTime fechaFin)
        {
            var sales = await _context.Sales
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Size)
                .Include(x => x.Client)
                .Where(x => x.Date >= fechaInicio
                         && x.Date <= fechaFin)
                .OrderByDescending(x => x.Date)
                .ToListAsync();
            return sales;
        }

        public async Task<List<Sale>> GetSalesByClient(int clientDoc)
        {
            var sales = await _context.Sales
                .Include(x => x.Details)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Details)
                    .ThenInclude(x => x.Size)
                .Include(x => x.Client)
                .Where(x => x.ClientDoc == clientDoc)
                .ToListAsync();
            return sales;
        }

        public async Task<Sale> Save(Sale sale)
        {
            var response = await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();
            return response.Entity;
        }

        public async Task<Sale> Update(Sale sale)
        {
            var response = _context.Sales.Update(sale);
            await _context.SaveChangesAsync();
            return response.Entity;
        }
    }
}
