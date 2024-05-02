using _2nf_API.Requests;
using FluentValidation;

namespace _2nf_API.Validators
{
    public class StockRequestValidator : AbstractValidator<StockRequest>
    {
        public StockRequestValidator() 
        {
            RuleFor(x => x.Size)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.Amount)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
