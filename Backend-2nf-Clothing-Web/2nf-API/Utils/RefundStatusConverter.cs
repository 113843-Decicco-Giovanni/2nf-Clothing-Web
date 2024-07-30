using AutoMapper;

namespace _2nf_API.Utils
{
    public class RefundStatusConverter : IValueConverter<int, string>
    {
        public string Convert(int sourceMember, ResolutionContext context)
        {
            return sourceMember switch
            {
                0 => "Pendiente",
                1 => "En proceso",
                2 => "Finalizado",
                _ => "Desconocido" // Maneja valores no esperados
            };
        }
    }
}
