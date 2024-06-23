using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IReportsService
    {
        Task<List<VentasDiaReportResponse>> GetVentasPorDia(DateTime fechaDesde, DateTime fechaHasta);
        Task<List<VentasMesReportResponse>> GetVentasPorMes(DateTime mesDesde, DateTime mesHasta);
        Task<List<MontoFacturadoMesReportResponse>> GetMontoFacturadoPorMes(DateTime fechaDesde, DateTime fechaHasta);
        Task<List<MontoFacturadoDiaReportResponse>> GetMontoFacturadoPorDia(DateTime fechaDesde, DateTime fechaHasta);
    }
}
