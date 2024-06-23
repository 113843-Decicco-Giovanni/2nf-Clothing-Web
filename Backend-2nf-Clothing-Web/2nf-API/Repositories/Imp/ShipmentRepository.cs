using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly _2nfDbContext _context;
        public ShipmentRepository(_2nfDbContext context)
        {
            _context = context;
        }

        public async Task<List<Shipment>> Get(int? estado, DateTime? fechaInicio, DateTime? fechaFin, int? clientDoc)
        {
            var query = _context.Shipments
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Client)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Size)
                .AsQueryable();

            if (estado.HasValue)
            {
                query = query.Where(x => x.ShipmentState == estado.Value);
            }
            if (fechaInicio.HasValue && fechaFin.HasValue)
            {
                query = query.Where(x => x.Sale.Date >= fechaInicio.Value
                                      && x.Sale.Date <= fechaFin.Value);
            }
            if (clientDoc.HasValue)
            {
                query = query.Where(x => x.Sale.ClientDoc == clientDoc);
            }

            var shipments = await query.ToListAsync();

            return shipments;
        }

        public async Task<List<Shipment>> GetByClient(int clientDoc)
        {
            var shipments = await _context.Shipments
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Client)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Size)
                .Where(x => x.Sale.ClientDoc == clientDoc)
                .ToListAsync();

            return shipments;
        }

        public async Task<Shipment> GetById(int id)
        {
            var shipment = await _context.Shipments
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Client)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Size)
                .FirstOrDefaultAsync(x => x.Id == id);

            return shipment;
        }

        public async Task<List<Shipment>> GetByState(int state)
        {
            var shipments = await _context.Shipments
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Client)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Size)
                .Where(x => x.ShipmentState == state)
                .ToListAsync();

            return shipments;
        }

        public async Task<Shipment> Save(Shipment shipment)
        {
            var shipmentResponse = await _context.Shipments.AddAsync(shipment);
            await _context.SaveChangesAsync();

            return shipmentResponse.Entity;
        }

        public async Task<Shipment> Update(Shipment shipment)
        {
            var updated = _context.Shipments.Update(shipment);

            await _context.SaveChangesAsync();
            return updated.Entity;
        }
    }
}
