using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByEmail(string email);
        Task<User> GetByUser(string username);
        Task<User> Update(User user);
        Task<User> Create(User user);
        Task<User> GetById(int id);
        Task<List<User>> GetUsers();
    }
}
