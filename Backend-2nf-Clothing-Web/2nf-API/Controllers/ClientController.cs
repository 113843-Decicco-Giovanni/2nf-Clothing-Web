using _2nf_API.Requests;
using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/clients")]
    public class ClientController : Controller
    {
        private readonly IClientService _service;

        public ClientController(IClientService service)
        {
            _service = service;
        }
        
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ClientRequest request)
        {
            ClientResponse result = await _service.Create(request);
            return Ok(result);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] ClientLoginRequest request)
        {
            ClientResponse result = await _service.Login(request);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ClientRequest request)
        {
            ClientResponse result = await _service.Update(id, request);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> Get(string? name, int? docId)
        {
            List<ClientResponse> result = await _service.Get(name, docId);
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            ClientResponse result = await _service.GetById(id);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            ClientResponse result = await _service.Delete(id);
            return Ok(result);
        }
        
    }
}
