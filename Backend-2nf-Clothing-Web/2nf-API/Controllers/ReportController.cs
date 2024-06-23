using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/reports")]
    public class ReportController : Controller
    {
        private readonly IReportsService _service;

        public ReportController(IReportsService service)
        {
            _service = service;
        }

        [HttpGet("salesByMonth")]
        public async Task<IActionResult> GetSalesByMonth(DateTime mesDesde, DateTime mesHasta)
        {
            List<VentasMesReportResponse> response = await _service.GetVentasPorMes(mesDesde, mesHasta);
            return Ok(response);
        }

        [HttpGet("salesByDay")]
        public async Task<IActionResult> GetSalesByDay(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<VentasDiaReportResponse> response = await _service.GetVentasPorDia(fechaDesde, fechaHasta);
            return Ok(response);
        }
        [HttpGet("montoFacturadoDia")]
        public async Task<IActionResult> GetMontoFacturadoPorDia(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<MontoFacturadoDiaReportResponse> response = await _service.GetMontoFacturadoPorDia(fechaDesde, fechaHasta);
            return Ok(response);
        }
        [HttpGet("montoFacturadoMes")]
        public async Task<IActionResult> GetMontoFacturadoPorMes(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<MontoFacturadoMesReportResponse> response = await _service.GetMontoFacturadoPorMes(fechaDesde, fechaHasta);
            return Ok(response);
        }
    }
}
