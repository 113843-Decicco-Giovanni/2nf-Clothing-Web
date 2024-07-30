using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class RefundRepository : IRefundRepository
    {
        private readonly _2nfDbContext _context;
        public RefundRepository(_2nfDbContext context)
        {
            _context = context;
        }
        public async Task<Refund> Save(Refund refund)
        {
            var saved = await _context.Refunds.AddAsync(refund);
            await _context.SaveChangesAsync();
            return saved.Entity;
        }

        public async Task<Refund> GetById(int id)
        {
            var refund = await _context.Refunds
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                            .ThenInclude(x => x.Stocks)
                .FirstOrDefaultAsync(x => x.Id == id);

            return refund;
        }

        public async Task<Refund> GetBySaleId(int saleId)
        {
            var refund = await _context.Refunds
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                            .ThenInclude(x => x.Stocks)
                .FirstOrDefaultAsync(x => x.Sale.Id == saleId);

            return refund;
        }

        public async Task<Refund> Update(Refund refund)
        {
            var updated = _context.Refunds.Update(refund);
            await _context.SaveChangesAsync();
            return updated.Entity;
        }

        public async Task<List<Refund>> Get(int? state, int? clientDoc, DateTime? fechaInicio, DateTime? fechaFin)
        {
            var query = _context.Refunds
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                            .ThenInclude(x => x.Stocks)
                .AsQueryable();

            if (state.HasValue) query = query.Where(x => x.State == state);
            if (clientDoc.HasValue) query = query.Where(x => x.ClientDoc == clientDoc);
            if (fechaInicio.HasValue) query = query.Where(x => x.CreatedAt >= fechaInicio);
            if (fechaFin.HasValue) query = query.Where(x => x.CreatedAt <= fechaFin);

            var refunds = await query.ToListAsync();

            return refunds;
        }

        public async Task<List<Refund>> GetNoFinished()
        {
            var refunds = await _context.Refunds
                .Include(x => x.Sale)
                    .ThenInclude(x => x.Details)
                        .ThenInclude(x => x.Article)
                            .ThenInclude(x => x.Stocks)
                .Where(x => x.State != 2)
                .ToListAsync();

            return refunds;
        }
    }
}
