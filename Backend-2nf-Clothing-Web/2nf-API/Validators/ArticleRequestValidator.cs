using _2nf_API.Requests;
using FluentValidation;

namespace _2nf_API.Validators
{
    public class ArticleRequestValidator : AbstractValidator<ArticleRequest>
    {
        public ArticleRequestValidator() 
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Description)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Price)
                .NotNull()
                .NotEmpty()
                .GreaterThanOrEqualTo(1);
            RuleFor(x => x.Type)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.Images)
                .NotNull()
                .NotEmpty();
            RuleForEach(x => x.Images)
                .NotNull()
                .NotEmpty()
                .NotEqual("");
        }
    }
}
