using _2nf_API.Requests;
using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/shipments")]
    public class ShipmentController : Controller
    {
        private readonly IShipmentService _shipmentService;

        public ShipmentController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShipments(
            int? estado, 
            DateTime? fechaInicio, 
            DateTime? fechaFin, 
            int? clientDoc)
        {
            List<ShipmentResponse> result = await _shipmentService.GetShipments(estado, fechaInicio, fechaFin, clientDoc);
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetShipmentById(int id)
        {
            ShipmentResponse result = await _shipmentService.GetShipmentById(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("sale/{saleId}")]
        public async Task<IActionResult> GetShipmentBySaleId(int saleId)
        {
            ShipmentResponse result = await _shipmentService.GetShipmentBySaleId(saleId);
            return Ok(result);
        }

        [HttpPost]
        [Route("process/{shipmentId}")]
        public async Task<IActionResult> UpdateShipmentState(int shipmentId, long trackingId, string service)
        {
            ShipmentResponse result = await _shipmentService.UpdateShipmentState(shipmentId, trackingId, service);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> ModifyShipment(int id, [FromBody] ShipmentRequest request)
        {
            ShipmentResponse result = await _shipmentService.ModifyShipment(id, request);
            return Ok(result);
        }
    }
}
