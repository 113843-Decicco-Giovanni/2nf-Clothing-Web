using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IClientService
    {
        Task<ClientResponse> Create(ClientRequest request);
        Task<ClientResponse> Login(ClientLoginRequest request);
        Task<ClientResponse> Update(int id, ClientRequest request);
        Task<List<ClientResponse>> Get(string? name, int? docId);
        Task<ClientResponse> Delete(int id);
        Task<ClientResponse> GetById(int id);
    }
}
