using AutoMapper;

namespace _2nf_API.Utils
{
    public class ShipmentSatusConverter : IValueConverter<int, string>
    {
        public string Convert(int sourceMember, ResolutionContext context)
        {
            return sourceMember switch
            {
                0 => "Pendiente",
                1 => "Procesado",
                2 => "Finalizado",
                _ => "Desconocido" // Maneja valores no esperados
            };
        }
    }
}
