using _2nf_API.Entities;

namespace _2nf_API.Requests
{
    public class UserRequest
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string? NewPassword { get; set; }
        public Client? Client { get; set; }
    }
}
