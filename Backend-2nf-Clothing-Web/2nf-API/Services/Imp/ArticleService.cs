using _2nf_API.Entities;
using _2nf_API.Repositories;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;
using FluentValidation;
using System.Security.Cryptography.X509Certificates;

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

        public async Task<bool> ActivateArticle(int id)
        {
            return await _articleRepository.ActivateArticle(id);
        }


        public async Task<bool> DeleteArticle(int id)
        {
            var deleted = await _articleRepository.DeleteArticle(id);
            return deleted;
        }

        public async Task<ArticleResponse> GetArticleById(int id)
        {
            var article = await _articleRepository.GetById(id);
            var result = _mapper.Map<ArticleResponse>(article);
            return result;
        }

        public async Task<List<ArticleResponse>> GetArticles()
        {
            var articles = await _articleRepository.GetArticles();
            var articlesResponse = _mapper.Map<List<ArticleResponse>>(articles);
            return articlesResponse;
        }

        public async Task<List<ArticleResponse>> GetArticlesWithStock()
        {
            var articles = await _articleRepository.GetArticlesWithStock();
            var articlesResponse = _mapper.Map<List<ArticleResponse>>(articles);
            return articlesResponse;
        }

        public async Task<List<ArticleTypeResponse>> GetArticleTypes()
        {
            var result = await _articleRepository.GetArticleTypes();
            var response = _mapper.Map<List<ArticleTypeResponse>>(result);
            return response;
        }

        public async Task<List<SizeResponse>> GetSizes()
        {
            var sizes = await _articleRepository.GetSizes();
            var response = _mapper.Map<List<SizeResponse>>(sizes);
            return response;
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

        public async Task<ArticleResponse> UpdateArticle(int id, ArticleRequest request)
        {
            if (_validator.Validate(request).IsValid)
            {
                try
                {
                    var article = _mapper.Map<Article>(request);
                    article.Id = id;
                    var result = await _articleRepository.UpdateArticle(article);
                    var response = _mapper.Map<ArticleResponse>(result);
                    return response;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            throw new BadHttpRequestException("Petición Inválida");
        }

        public async Task<ArticleResponse> UpdateStock(int id, StockRequest request)
        {
            var article = await _articleRepository.GetById(id);
            var stock = article.Stocks.Find(x => x.Size.Id == request.Size);
            //si existe el stock
            if(stock != null)
            {
                article.Stocks.Remove(stock);
                //si se quiere sumar stock
                if(request.Amount > 0)
                {
                    stock.Amount += request.Amount;
                    stock.LastAmountAdded = request.Amount;
                    article.Stocks.Add(stock);
                    var updated = await _articleRepository.UpdateArticle(article);
                    var response = _mapper.Map<ArticleResponse>(updated);
                    return response;
                }
                //si se quiere restar stock y la cantidad a restar es menor o igual que el stock actual
                else if(request.Amount < 0 && request.Amount <= stock.Amount)
                {
                    stock.Amount += request.Amount;
                    stock.LastAmountAdded = request.Amount;
                    article.Stocks.Add(stock);
                    var updated = await _articleRepository.UpdateArticle(article);
                    var response = _mapper.Map<ArticleResponse>(updated);
                    return response;
                }
                //si la cantidad a actualizar es cero o se quiere restar más que el total
                throw new BadHttpRequestException("No se puede actualizar el stock porque la cantidad es 0 o no hay tanto para restar");

            }
            //no existe el stock y la cantidad es mayor a cero
            if(request.Amount > 0)
            {
                var size = await _articleRepository.GetSizeById(request.Size);
                //si el talle existe se crea el stock
                if (size != null)
                {
                    stock = new Stock
                    {
                        Article = article,
                        Size = size,
                        Amount = request.Amount,
                        UpdatedAt = DateTime.Now,
                        LastAmountAdded = request.Amount
                    };
                    article.Stocks.Add(stock);
                    var updated = await _articleRepository.UpdateArticle(article);
                    var response = _mapper.Map<ArticleResponse>(updated);
                    return response;
                }
                //si no existe ese talle
                throw new BadHttpRequestException("No existe este talle");
            }
            //no existe el stock y la cantidad es menor a cero o cero
            throw new BadHttpRequestException("No existe el stock para restar unidades");
        }
    }
}
