using _2nf_API.Requests;
using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace _2nf_API.Controllers
{
    [Route("api/sale")]
    public class SaleController : Controller
    {
        private readonly ISaleService _saleService;
        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }
        [HttpGet]
        [Route("status/{paymentId}")]
        public async Task<IActionResult> GetPaymentStatus(long paymentId)
        {
            var result = await _saleService.GetPaymentStatus(paymentId);
            return Ok(result);
        }
        [HttpPost]
        [Route("preference")]
        public async Task<IActionResult> CreatePreference([FromBody] CreatePreferenceRequest request)
        {
            var result = await _saleService.CreatePreference(request);
            return Ok(result);
        }

        [HttpPost]
        [Route("webhook-payment")]
        public async Task<IActionResult> WebHookPayment()
        {
            var result = await _saleService.ReadWebHook(Request);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetSales(DateTime fechaInicio, DateTime fechaFin, int? clientDoc)
        {
            List<SaleResponse> result = await _saleService.GetSales(fechaInicio, fechaFin, clientDoc);
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetSaleById(int id)
        {
            SaleResponse result = await _saleService.GetSaleById(id);
            return Ok(result);
        }
        [HttpGet]
        [Route("payment/{id}")]
        public async Task<IActionResult> GetSaleByPaymentId(long id)
        {
            SaleResponse result = await _saleService.GetSaleByPaymentId(id);
            return Ok(result);
        }
        [HttpPut]
        [Route("refund/{id}")]
        public async Task<IActionResult> UpdateRefundPending(int id)
        {
            await _saleService.UpdateRefundPending(id);
            return Ok();
        }
    }
}