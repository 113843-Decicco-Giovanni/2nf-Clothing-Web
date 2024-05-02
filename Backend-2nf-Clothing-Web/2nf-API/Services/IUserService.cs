using _2nf_API.Entities;
using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IUserService
    {
        Task<UserResponse> Login(UserLoginRequest request);
        Task<UserResponse> Create(int adminId, UserRequest request);
        Task<UserResponse> UpdateUser(int id, UserRequest request);
        Task<bool> ChangeAdmin(int idAdmin, int idRequested);
        Task<bool> ChangeActive(int idAdmin, int idRequested);
        Task<List<UserResponse>> GetUsers(int adminId);
    }
}
