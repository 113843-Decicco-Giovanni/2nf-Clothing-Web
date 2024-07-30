using _2nf_API.Responses;

namespace _2nf_API.Repositories
{
    public interface IReportsRepository
    {
        Task<List<VentasDiaReportResponse>> GetVentasPorDia(DateTime fechaDesde, DateTime fechaHasta);
        Task<List<VentasMesReportResponse>> GetVentasPorMes(DateTime mesDesde, DateTime mesHasta);
        Task<List<MontoFacturadoDiaReportResponse>> GetMontoFacturadoDia(DateTime fechaDesde, DateTime fechaHasta);
        Task<List<MontoFacturadoMesReportResponse>> GetMontoFacturadoMes(DateTime fechaDesde, DateTime fechaHasta);

    }
}
