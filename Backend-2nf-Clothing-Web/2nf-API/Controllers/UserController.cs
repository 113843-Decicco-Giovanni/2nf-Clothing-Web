using _2nf_API.Requests;
using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("{adminId}")]
        public async Task<IActionResult> GetUsers(int adminId)
        {
            List<UserResponse> result = await _service.GetUsers(adminId);
            return Ok(result);
        }
        [HttpPost]
        [Route("{adminId}")]
        public async Task<ActionResult> CreateUser(int adminId, [FromBody] UserRequest request)
        {
            UserResponse result = await _service.Create(adminId, request);
            return Ok(result);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginRequest request)
        {
            UserResponse result = await _service.Login(request);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] UserRequest request)
        {
            UserResponse result = await _service.UpdateUser(id, request);
            return Ok(result);
        }
        [HttpPut]
        [Route("admin/{idAdmin}/{idRequested}")]
        public async Task<ActionResult> ChangeAdmin(int idAdmin, int idRequested)
        {
            bool result = await _service.ChangeAdmin(idAdmin, idRequested);
            return Ok(result);
        }
        [HttpPut]
        [Route("{idAdmin}/{idRequested}")]
        public async Task<ActionResult> ChangeActive(int idAdmin, int idRequested)
        {
            bool result = await _service.ChangeActive(idAdmin, idRequested);
            return Ok(result);
        }
    }
}