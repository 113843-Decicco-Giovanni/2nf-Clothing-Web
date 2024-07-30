using AutoMapper;

namespace _2nf_API.Utils
{
    public class DevolutionStatusConverter : IValueConverter<int, string>
    {
        public string Convert(int sourceMember, ResolutionContext context)
        {
            return sourceMember switch
            {
                0 => "Pendiente",
                1 => "En curso",
                2 => "Finalizado",
                3 => "Cancelado",
                _ => "Desconocido" // Maneja valores no esperados
            };
        }
    }
}
