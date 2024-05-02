using _2nf_API.Requests;
using FluentValidation;

namespace _2nf_API.Validators
{
    public class ClientRequestValidator : AbstractValidator<ClientRequest>
    {
        public ClientRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Surname)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.DocId)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.Street)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.StreetNumber)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.City)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.State)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Country)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Phone)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.PostalCode)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(50);
        }
    }
}
