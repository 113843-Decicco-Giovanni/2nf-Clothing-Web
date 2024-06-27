using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class DevolutionRepository : IDevolutionRepository
    {
        private readonly _2nfDbContext _context;
        public DevolutionRepository( _2nfDbContext context )
        {
            _context = context;
        }
        public async Task<Devolution> Save(Devolution devolution)
        {
            var response = await _context.Devolutions.AddAsync(devolution);
            await _context.SaveChangesAsync();
            return response.Entity;
        }

        public async Task<Devolution> GetById(int id)
        {
            var devolution = await _context.Devolutions.FirstOrDefaultAsync(x => x.Id == id);

            return devolution;
        }

        public async Task<Devolution> GetByShipment(int shipmentId)
        {
            var devolution = await _context.Devolutions.Include(x => x.Shipment).FirstOrDefaultAsync(x => x.Shipment.Id == shipmentId);

            return devolution;
        }

        public async Task<Devolution> Update(Devolution devolution)
        {
            var response = _context.Devolutions.Update(devolution);

            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<List<Devolution>> Get(int? state, int? dni, DateTime? fechaInicio, DateTime? fechaFin)
        {
            var query = _context.Devolutions
                //.Include(x => x.Shipment)
                //    .ThenInclude(x => x.Sale)
                //        .ThenInclude(x => x.Client)
                .Include(x => x.Shipment)
                    .ThenInclude(x => x.Sale)
                        .ThenInclude(x => x.Details).AsQueryable();

            if (state.HasValue) query = query.Where(x => x.State == state.Value);
            if (dni.HasValue) query = query.Where(x => x.ClientDoc == dni.Value);
            if (fechaInicio.HasValue) query = query.Where(x => x.CreatedAt >= fechaInicio);
            if (fechaFin.HasValue) query = query.Where(x => x.CreatedAt <= fechaFin);

            var devolutions = await query.ToListAsync();

            return devolutions;
        }
    }
}
