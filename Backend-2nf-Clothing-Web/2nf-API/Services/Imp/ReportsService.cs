using _2nf_API.Repositories;
using _2nf_API.Responses;

namespace _2nf_API.Services.Imp
{
    public class ReportsService : IReportsService
    {
        private readonly IReportsRepository _repository;

        public ReportsService(IReportsRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<VentasDiaReportResponse>> GetVentasPorDia(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<VentasDiaReportResponse> response = await _repository.GetVentasPorDia(fechaDesde, fechaHasta);

            return response;
        }

        public async Task<List<VentasMesReportResponse>> GetVentasPorMes(DateTime mesDesde, DateTime mesHasta)
        {
            List<VentasMesReportResponse> response = await _repository.GetVentasPorMes(mesDesde, mesHasta);

            //response.Sort(x => x.Unit.Split("/")[0]);

            return response;
        }

        public async Task<List<MontoFacturadoDiaReportResponse>> GetMontoFacturadoPorDia(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<MontoFacturadoDiaReportResponse> response = await _repository.GetMontoFacturadoDia(fechaDesde, fechaHasta);

            return response;
        }

        public async Task<List<MontoFacturadoMesReportResponse>> GetMontoFacturadoPorMes(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<MontoFacturadoMesReportResponse> response = await _repository.GetMontoFacturadoMes(fechaDesde, fechaHasta);

            return response;
        }
    }
}
