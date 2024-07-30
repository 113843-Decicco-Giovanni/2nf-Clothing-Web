using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Repositories.Imp;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using FluentValidation;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace _2nf_API.Services.Imp
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IValidator<ClientRequest> _clientValidator;
        private readonly IValidator<ClientLoginRequest> _loginValidator;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public ClientService(
            IClientRepository repository, 
            IUserRepository userRepository, 
            IValidator<ClientRequest> clientValidator, 
            IValidator<ClientLoginRequest> loginValidator, 
            IMapper mapper, 
            IConfiguration configuration)
        {
            _repository = repository;
            _userRepository = userRepository;
            _clientValidator = clientValidator;
            _loginValidator = loginValidator;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<ClientResponse> Create(ClientRequest request)
        {
            var validation = _clientValidator.Validate(request);
            if (validation.IsValid)
            {
                var user = new User
                {
                    Email = request.Email,
                    UserName = request.UserName,
                    Password = request.Password,
                    IsUserAdmin = false,
                    CreatedAt = DateTime.Now,
                    LastSessionId = 1,
                    LastLogin = DateTime.Now,
                    Active = true,
                    Client = true
                };
                var client = _mapper.Map<Client>(request);
                try
                {
                    var createdUser = await _userRepository.Create(user);
                    client.User = createdUser;

                    var createdClient = await _repository.Create(client);

                    var userResponse = _mapper.Map<UserResponse>(createdUser);
                    ClientResponse response = _mapper.Map<ClientResponse>(createdClient);
                    response.User = userResponse;

                    return response;
                }
                catch (Exception) 
                {
                    throw;
                }
            }
            throw new BadHttpRequestException(validation.Errors.FirstOrDefault().ErrorMessage);
        }

        public async Task<ClientResponse> Delete(int id)
        {
            var deleted = await _repository.Delete(id);
            var response = _mapper.Map<ClientResponse>(deleted);
            return response;
        }

        public async Task<List<ClientResponse>> Get(string? name, int? docId)
        {
            var clients = await _repository.Get(name, docId);
            var result = _mapper.Map<List<ClientResponse>>(clients);
            return result;
        }

        public async Task<ClientResponse> GetById(int id)
        {
            var client = await _repository.GetById(id);
            var result = _mapper.Map<ClientResponse>(client);
            return result;
        }

        public async Task<ClientResponse> Login(ClientLoginRequest request)
        {
            var validation = _loginValidator.Validate(request);
            if (validation.IsValid)
            {
                var user = await _userRepository.GetByEmail(request.Email);
                if(user != null && user.Password == request.Password && user.Client)
                {
                    var client = await _repository.GetByUser(user);
                    user.LastLogin = DateTime.Now;
                    user.LastSessionId += 1;
                    var updatedUser = await _userRepository.Update(user);
                    client.User = updatedUser;
                    var response = _mapper.Map<ClientResponse>(client);
                    return response;
                }
                throw new AccessViolationException("Usuario o contraseñas incorrecto");
            }
            throw new BadHttpRequestException("Cuerpo de la peticion incorrecta");
        }

        public async Task<ClientResponse> Update(int id, ClientRequest request)
        {
            var validator = _clientValidator.Validate(request);
            if (validator.IsValid)
            {
                var clientToUpdate = await _repository.GetById(id);
                if(request.Password == clientToUpdate.User.Password)
                {
                    var userEmail = await _userRepository.GetByEmail(request.Email);
                    if (userEmail != null && userEmail.Id != clientToUpdate.User.Id)
                    {
                        throw new BadHttpRequestException("Este email ya está registrado");
                    }
                    var userUserName = await _userRepository.GetByUser(request.UserName);
                    if (userUserName != null && userUserName.Id != clientToUpdate.User.Id)
                    {
                        throw new BadHttpRequestException("Este username ya está registrado");
                    }
                    var clientDoc = await _repository.GetByDoc(request.DocId);
                    if (clientDoc != null && clientDoc.Id != id)
                    {
                        throw new BadHttpRequestException("Este documento ya está registrado");
                    }
                    var notificarEmail = clientToUpdate.User.Email != request.Email;
                    clientToUpdate = MapearEntidad(request, clientToUpdate, id);

                    var updated = await _repository.Update(clientToUpdate);
                    var response = _mapper.Map<ClientResponse>(updated);

                    if (notificarEmail) await NotificarCliente(request.Email, clientDoc.DocId);

                    return response;
                }
                throw new AccessViolationException("Contraseña incorrecta");
            }
            throw new BadHttpRequestException("Peticion inválida");
        }

        private async Task NotificarCliente(string email, int doc)
        {
            var client = await _repository.GetByDoc(doc);
            // Configuración del mensaje de correo
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("2nf.clothing@gmail.com");
            mail.To.Add(client.User.Email);
            mail.Subject = "Email actualizado";

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Estimado/a " + client.Name + " " + client.Surname + ",");
            sb.AppendLine();
            sb.AppendLine("Su dirección de correo fue actualizada a la que está recibiendo este mail.");
            sb.AppendLine();

            sb.AppendLine("Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.");
            sb.AppendLine();
            sb.AppendLine("Saludos cordiales,");
            sb.AppendLine("Equipo de Atención al Cliente");

            mail.Body = sb.ToString();

            // Si necesitas adjuntar un archivo
            // mail.Attachments.Add(new Attachment("ruta/al/archivo"));

            // Configuración del cliente SMTP
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
            smtpServer.Port = 587; // O el puerto que uses
            smtpServer.Credentials = new NetworkCredential(_configuration["Email:Direction"], _configuration["Email:Token"]);
            smtpServer.EnableSsl = true; // True si el servidor SMTP requiere SSL

            // Enviar el correo
            smtpServer.Send(mail);
            Console.WriteLine("Correo enviado exitosamente.");
        }

        private Client MapearEntidad(ClientRequest request, Client entity, int id)
        {
            var result = _mapper.Map(request, entity);
            result.Id = id;
            ///actualizacion de datos de usuario
            result.User = entity.User;
            result.User.UpdatedAt = DateTime.Now;
            result.User.UserName = request.UserName;
            result.User.Email = request.Email;
            ///si existe una nueva contraseña y es válida se cambia
            if (request.NewPassword != null && request.NewPassword != "")
            {
                if (request.NewPassword.Length < 8)
                {
                    throw new BadHttpRequestException("Contraseña demasiado corta");
                }
                if (request.NewPassword.Length > 50)
                {
                    throw new BadHttpRequestException("Contraseña demasiado larga");
                }
                result.User.Password = request.NewPassword;
            }
            return result;
        }
    }
}
