using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using FluentValidation;

namespace _2nf_API.Services.Imp
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<ArticleRequest> _validator;
        public ArticleService(IArticleRepository articleRepository, IMapper mapper, IValidator<ArticleRequest> validator)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<List<ArticleResponse>> GetArticles()
        {
            var articles = await _articleRepository.GetArticles();
            var articlesResponse = _mapper.Map<List<ArticleResponse>>(articles);
            return articlesResponse;
        }

        public async Task<ArticleResponse> SaveArticle(ArticleRequest request)
        {
            if(_validator.Validate(request).IsValid)
            {
                try
                {
                    var article = _mapper.Map<Article>(request);
                    var savedArticle = await _articleRepository.SaveArticle(article);
                    var response = _mapper.Map<ArticleResponse>(savedArticle);
                    return response;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                throw new BadHttpRequestException("El request no es válido");
            }
        }
    }
}
