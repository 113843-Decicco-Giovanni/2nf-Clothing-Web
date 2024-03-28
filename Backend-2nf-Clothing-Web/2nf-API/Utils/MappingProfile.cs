using _2nf_API.Entities;
using _2nf_API.Requests;
using _2nf_API.Responses;
using AutoMapper;

namespace _2nf_API.Utils
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<ArticleRequest, Article>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => new ArticleType { Id = src.Type }))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(imageUrl => new Image { URL = imageUrl })))
                .AfterMap((src, dest) =>
                {
                    foreach (var image in dest.Images)
                    {
                        image.Article = dest;
                    }
                });
            CreateMap<Article, ArticleResponse>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.Id))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(image => image.URL).ToList()));
        }
    }
}
