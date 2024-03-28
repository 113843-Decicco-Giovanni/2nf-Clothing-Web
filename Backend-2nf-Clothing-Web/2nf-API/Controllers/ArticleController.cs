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
    }
}
