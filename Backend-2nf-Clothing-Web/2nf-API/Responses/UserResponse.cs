namespace _2nf_API.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public bool IsUserAdmin { get; set; }
        public bool Active { get; set; }
        public int SessionId {  get; set; }
    }
}
