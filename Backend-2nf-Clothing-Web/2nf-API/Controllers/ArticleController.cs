using _2nf_API.Requests;
using _2nf_API.Responses;
using _2nf_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2nf_API.Controllers
{
    [Route("api/articles")]
    public class ArticleController : Controller
    {
        private readonly IArticleService _service;

        public ArticleController(IArticleService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult> AddArticle([FromBody] ArticleRequest request)
        {
            ArticleResponse result = await _service.SaveArticle(request);
            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult> GetArticles()
        {
            List<ArticleResponse> result = await _service.GetArticles();
            return Ok(result);
        }
        [HttpGet]
        [Route("stock")]
        public async Task<ActionResult> GetArticlesWithStock()
        {
            List<ArticleResponse> result = await _service.GetArticlesWithStock();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetArticleById(int id)
        {
            ArticleResponse result = await _service.GetArticleById(id);
            return Ok(result);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateArticle(int id, [FromBody] ArticleRequest request)
        {
            ArticleResponse result = await _service.UpdateArticle(id, request);
            return Ok(result);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            bool result = await _service.DeleteArticle(id);
            return Ok(result);
        }
        [HttpPut]
        [Route("activate/{id}")]
        public async Task<ActionResult> ActivateArticle(int id)
        {
            bool result = await _service.ActivateArticle(id);
            return Ok(result);
        }

        //auxiliares
        [HttpGet]
        [Route("sizes")]
        public async Task<ActionResult> GetSizes()
        {
            List<SizeResponse> result = await _service.GetSizes();
            return Ok(result);
        }
        [HttpGet]
        [Route("types")]
        public async Task<ActionResult> GetArticleTypes()
        {
            List<ArticleTypeResponse> result = await _service.GetArticleTypes();
            return Ok(result);
        }

        //stock
        [HttpPut]
        [Route("stock/{id}")]
        public async Task<ActionResult> UpdateStock(int id, [FromBody]StockRequest request)
        {
            var result = await _service.UpdateStock(id, request);
            return Ok(result);
        }
    }
}
