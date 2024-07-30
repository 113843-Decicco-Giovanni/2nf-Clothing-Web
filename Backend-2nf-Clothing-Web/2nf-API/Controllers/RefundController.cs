//using _2nf_API.Requests;
//using _2nf_API.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace _2nf_API.Controllers
//{
//    [Route("api/refunds")]
//    public class RefundController : Controller
//    {
//        private readonly IRefundService _service;

//        public RefundController(IRefundService service)
//        {
//            _service = service;
//        }

//        [HttpPost]
//        public async Task<IActionResult> Create([FromBody] RefundRequest request)
//        {
//            var result = await _service.Create(request);
//            return Ok(result);
//        }

//        [HttpGet]
//        public async Task<IActionResult> Get(int? state, int? clientDoc, DateTime? fechaInicio, DateTime? fechaFin)
//        {
//            var result = await _service.Get(state, clientDoc, fechaInicio, fechaFin);
//            return Ok(result);
//        }
//    }
//}
