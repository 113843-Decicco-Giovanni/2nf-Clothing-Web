using _2nf_API.Data;
using _2nf_API.Responses;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly _2nfDbContext _context;

        public ReportsRepository(_2nfDbContext context)
        {
            _context = context;
        }

        public async Task<List<VentasDiaReportResponse>> GetVentasPorDia(DateTime fechaDesde, DateTime fechaHasta)
        {
            var salesReport = await _context.Sales
                .Where(s => s.Date >= fechaDesde
                            && s.Date <= fechaHasta)
                .GroupBy(s => new { s.Date.Day, s.Date.Year, s.Date.Month })
                .Select(g => new VentasDiaReportResponse
                {
                    Day = g.Key.Day,
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Amount = g.Count()
                })
                .OrderBy(r => r.Year)
                .ThenBy(r => r.Month)
                .ThenBy(r => r.Day)
                .ToListAsync();

            return salesReport;
        }

        public async Task<List<VentasMesReportResponse>> GetVentasPorMes(DateTime mesDesde, DateTime mesHasta)
        {
            var salesReport = await _context.Sales
                .Where(s => s.Date >= mesDesde
                            && s.Date <= mesHasta)
                .GroupBy(s => new { s.Date.Year, s.Date.Month })
                .Select(g => new VentasMesReportResponse
                {
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Amount = g.Count()
                })
                .OrderBy(r => r.Year)
                .ThenBy(r => r.Month)
                .ToListAsync();

            return salesReport;
        }

        public async Task<List<MontoFacturadoDiaReportResponse>> GetMontoFacturadoDia(DateTime fechaDesde, DateTime fechaHasta)
        {
            var salesReport = await _context.Sales
                .Include(s => s.Details)
                .Where(s => s.Date >= fechaDesde && s.Date <= fechaHasta)
                .GroupBy(s => new { s.Date.Day, s.Date.Month, s.Date.Year })
                .Select(g => new MontoFacturadoDiaReportResponse
                {
                    Day = g.Key.Day,
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Amount = g.Sum(s => s.Details.Sum(d => d.UnitPrice * d.Amount))
                })
                .OrderBy(r => r.Year)
                .ThenBy(r => r.Month)
                .ThenBy(r => r.Day)
                .ToListAsync();

            return salesReport;
        }

        public async Task<List<MontoFacturadoMesReportResponse>> GetMontoFacturadoMes(DateTime fechaDesde, DateTime fechaHasta)
        {
            var salesReport = await _context.Sales
                .Include(s => s.Details)
                .Where(s => s.Date >= fechaDesde && s.Date <= fechaHasta)
                .GroupBy(s => new { s.Date.Month, s.Date.Year })
                .Select(g => new MontoFacturadoMesReportResponse
                {
                    //Day = g.Key.Day,
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    Amount = g.Sum(s => s.Details.Sum(d => d.UnitPrice * d.Amount))
                })
                .OrderBy(r => r.Year)
                .ThenBy(r => r.Month)
                .ToListAsync();

            return salesReport;
        }
    }
}
