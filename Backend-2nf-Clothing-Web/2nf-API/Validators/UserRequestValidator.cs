using _2nf_API.Requests;
using FluentValidation;

namespace _2nf_API.Validators
{
    public class UserRequestValidator : AbstractValidator<UserRequest>
    {
        public UserRequestValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .NotNull()
                .MinimumLength(4);
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(50);
        }
    }
}
