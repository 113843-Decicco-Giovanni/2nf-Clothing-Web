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
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
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
            CreateMap<User, UserResponse>()
                .ForMember(dest => dest.SessionId, opt => opt.MapFrom(src => src.LastSessionId));
            CreateMap<ArticleType, ArticleTypeResponse>();
            CreateMap<Stock, StockResponse>()
                .ForMember(dest => dest.Article, opt => opt.MapFrom(src => src.Article.Id))
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.Size.Id));
            CreateMap<Size, SizeResponse>();
            CreateMap<ClientRequest, Client>()
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => DateTime.Now));
            CreateMap<Client, ClientResponse>();
            CreateMap<Shipment, ShipmentResponse>()
                .ForMember(x => x.ShipmentState, opt => opt.ConvertUsing(new ShipmentSatusConverter(), src => src.ShipmentState));
            CreateMap<SaleDetail, SaleDetailResponse>();
            CreateMap<Sale, SaleResponse>();
            CreateMap<ShipmentRequest, Shipment>();
            CreateMap<Refund, RefundResponse>()
                .ForMember(x => x.SaleId, opt => opt.MapFrom(x => x.Sale.Id))
                .ForMember(x => x.State, opt => opt.ConvertUsing(new RefundStatusConverter(), src => src.State));
            CreateMap<Devolution, DevolutionResponse>()
                .ForMember(x => x.ShipmentId, opt => opt.MapFrom(x => x.Shipment.Id))
                .ForMember(x => x.State, opt => opt.ConvertUsing(new DevolutionStatusConverter(), src => src.State));
        }
    }
}