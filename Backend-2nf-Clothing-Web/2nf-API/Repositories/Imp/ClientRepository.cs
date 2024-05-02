using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class ClientRepository : IClientRepository
    {
        private readonly _2nfDbContext _dbContext;

        public ClientRepository(_2nfDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Client> Create(Client client)
        {
            var existe = await _dbContext.Clients.AnyAsync(x => x.DocId == client.DocId);
            if (!existe)
            {
                var createdClient = await _dbContext.AddAsync(client);
                await _dbContext.SaveChangesAsync();
                return createdClient.Entity;
            }
            throw new Exception("El cliente ya existe");
        }

        public async Task<Client> Delete(int id)
        {
            var result = await _dbContext.Clients.FindAsync(id);
            if (result != null)
            {
                result.DeletedAt = DateTime.Now;
                _dbContext.Update(result);
                await _dbContext.SaveChangesAsync();
                return result;
            }
            throw new NullReferenceException();
        }

        public async Task<List<Client>> Get()
        {
            var result = await _dbContext.Clients.Include(x => x.User).ToListAsync();
            return result;
        }

        public async Task<Client> GetByUser(User user)
        {
            var client = await _dbContext.Clients.Include(x => x.User).FirstOrDefaultAsync(x => x.User == user);
            if(client != null)
            {
                return client;
            }
            throw new NullReferenceException();
        }

        public async Task<Client> Update(Client client)
        {
            var response = _dbContext.Clients.Update(client);
            await _dbContext.SaveChangesAsync();
            return response.Entity;
        }
        public async Task<Client> GetById(int id)
        {
            var response = await _dbContext.Clients.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
            if(response != null)
            {
                return response;
            }
            throw new NullReferenceException();
        }

        public async Task<Client> GetByDoc(int doc)
        {
            var client = await _dbContext.Clients.FirstOrDefaultAsync(x => x.DocId == doc);
            return client;
        }
    }
}
