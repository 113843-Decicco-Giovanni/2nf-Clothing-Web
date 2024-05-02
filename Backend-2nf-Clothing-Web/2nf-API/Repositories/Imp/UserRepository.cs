using _2nf_API.Data;
using _2nf_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace _2nf_API.Repositories.Imp
{
    public class UserRepository : IUserRepository
    {
        private readonly _2nfDbContext _context;

        public UserRepository( _2nfDbContext context )
        {
            _context = context;
        }

        public async Task<User> Create(User user)
        {
            var existe = await _context.Users.AnyAsync(x => x.Email == user.Email || x.UserName == user.UserName);
            if (!existe)
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
            }
            throw new Exception("El usuario ya existe");
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public async Task<User> GetByUser(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            return user;
        }

        public async Task<User> Update(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> GetById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id  == id);
            if( user == null )
            {
                throw new ArgumentNullException();
            }
            return user;
        }

        public async Task<List<User>> GetUsers()
        {
            var users = await _context.Users.Where(x => x.Client == false).ToListAsync();
            if(users.Count == 0)
            {
                throw new ArgumentNullException();
            }
            return users;
        }
    }
}
