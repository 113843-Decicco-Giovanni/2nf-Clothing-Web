using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using FluentValidation;

namespace _2nf_API.Services.Imp
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IValidator<UserLoginRequest> _validatorLogin;
        private readonly IValidator<UserRequest> _validatorUser;
        private readonly IMapper _mapper;
        public UserService(
            IUserRepository repository,
            IValidator<UserLoginRequest> validatorLogin,
            IValidator<UserRequest> validatorUser,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            _validatorLogin = validatorLogin;
            _validatorUser = validatorUser;
        }

        public async Task<UserResponse> Create(int adminId, UserRequest request)
        {
            if (_validatorUser.Validate(request).IsValid)
            {
                var userAdmin = await _repository.GetById(adminId);
                if (userAdmin.IsUserAdmin)
                {
                    var user = new User
                    {
                        Email = request.Email,
                        UserName = request.UserName,
                        Password = request.Password,
                        IsUserAdmin = false,
                        CreatedAt = DateTime.UtcNow,
                        LastSessionId = 1,
                        LastLogin = DateTime.UtcNow,
                        Active = true,
                        Client = false
                    };
                    try
                    {
                        var userCreated = await _repository.Create(user);
                        var response = _mapper.Map<UserResponse>(userCreated);
                        return response;
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
                throw new AccessViolationException("No es usuario administrador");
            }
            throw new BadHttpRequestException("Request Incorrecto");
        }

        public async Task<bool> ChangeActive(int idAdmin, int idRequested)
        {
            var userAdmin = await _repository.GetById(idAdmin);
            if (userAdmin.IsUserAdmin)
            {
                var userRequested = await _repository.GetById(idRequested);
                userRequested.Active = !userRequested.Active;
                await _repository.Update(userRequested);
                return true;
            }
            throw new AccessViolationException();
        }

        public async Task<List<UserResponse>> GetUsers(int adminId)
        {
            var userAdmin = await _repository.GetById(adminId);
            if (userAdmin == null || !userAdmin.IsUserAdmin)
            {
                throw new AccessViolationException();
            }
            var users = await _repository.GetUsers();
            var response = _mapper.Map<List<UserResponse>>(users);
            return response;
        }

        public async Task<bool> ChangeAdmin(int idAdmin, int idRequested)
        {
            var admin = await _repository.GetById(idAdmin);
            if (admin.IsUserAdmin)
            {
                var userRequested = await _repository.GetById(idRequested);
                userRequested.IsUserAdmin = !userRequested.IsUserAdmin;
                await _repository.Update(userRequested);
                return true;
            }
            throw new AccessViolationException();
        }

        public async Task<UserResponse> Login(UserLoginRequest request)
        {
            if (_validatorLogin.Validate(request).IsValid)
            {
                var user = await _repository.GetByUser(request.UserName);
                if (user != null && user.Active && !user.Client)
                {
                    if (user.Password == request.Password)
                    {
                        var response = _mapper.Map<UserResponse>(user);
                        user.LastLogin = DateTime.Now;
                        user.LastSessionId += 1;
                        response.SessionId = user.LastSessionId;
                        await _repository.Update(user);
                        return response;
                    }
                }
                throw new Exception("No se encontró el usuario o no tiene permiso para logear");
            }
            throw new BadHttpRequestException("Request Inválido");
        }

        public async Task<UserResponse> UpdateUser(int userId, UserRequest request)
        {
            if (_validatorUser.Validate(request).IsValid)
            {
                var userEmail = await _repository.GetByEmail(request.Email);
                var userUsername = await _repository.GetByUser(request.UserName);
                if (userEmail != null && userEmail.Id != userId)
                {
                    throw new BadHttpRequestException("Ya existe ese email");
                }
                if (userUsername != null && userUsername.Id != userId)
                {
                    throw new BadHttpRequestException("Ya existe ese username");
                }
                var user = await _repository.GetById(userId);
                if (user != null)
                {
                    if (user.Password == request.Password)
                    {
                        user.Email = request.Email;
                        user.UserName = request.UserName;
                        if (request.NewPassword != null && request.NewPassword != "" && request.NewPassword.Length >= 8)
                        {
                            user.Password = request.NewPassword;
                        }
                        user.UpdatedAt = DateTime.Now;
                        await _repository.Update(user);
                        var response = _mapper.Map<UserResponse>(user);
                        return response;
                    }
                    throw new AccessViolationException("Contraseña incorrecta");
                }
                throw new ArgumentNullException("No existe un usuario con ese Id");
            }
            throw new BadHttpRequestException("Petición invalida");
        }
    }
}
