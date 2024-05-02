using _2nf_API.Entities;

namespace _2nf_API.Repositories
{
    public interface IClientRepository
    {
        Task<Client> Create(Client client);
        Task<Client> Update(Client client);
        Task<Client> Delete(int id);
        Task<Client> GetByUser(User user);
        Task<Client> GetById(int id);
        Task<Client> GetByDoc(int doc);
        Task<List<Client>> Get();
    }
}
