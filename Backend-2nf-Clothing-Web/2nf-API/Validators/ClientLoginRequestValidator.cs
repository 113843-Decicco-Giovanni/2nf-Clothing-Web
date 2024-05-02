using _2nf_API.Requests;
using FluentValidation;

namespace _2nf_API.Validators
{
    public class ClientLoginRequestValidator : AbstractValidator<ClientLoginRequest>
    {
        public ClientLoginRequestValidator() 
        {
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(50);
        }
    }
}
