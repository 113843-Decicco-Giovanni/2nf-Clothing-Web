using _2nf_API.Requests;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/devolution")]
    public class DevolutionController : Controller
    {
        private readonly IDevolutionService _devolutionService;

        public DevolutionController(IDevolutionService devolutionService)
        {
            _devolutionService = devolutionService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int? state, int? dni, DateTime? fechaInicio, DateTime? fechaFin)
        {
            var result = await _devolutionService.Get(state, dni, fechaInicio, fechaFin);
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _devolutionService.GetById(id);
            return Ok(result);
        }
        [HttpGet]
        [Route("shipment/{shipmentId}")]
        public async Task<IActionResult> GetByShipmentId(int shipmentId)
        {
            var result = await _devolutionService.GetByShipmentId(shipmentId);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DevolutionRequest request)
        {
            var result = await _devolutionService.Create(request);
            return Ok(result);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateState(int id, int state, string detail)
        {
            var result = await _devolutionService.UpdateState(id, state, detail);
            return Ok(result);
        }
    }
}
