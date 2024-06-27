using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class DevolutionResponse
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public string Reason { get; set; }
        /// <summary>
        /// "0": Pendiente -
        /// "1": En Curso -
        /// "2": Finalizado -
        /// "3": Cancelado
        /// </summary>
        public int State { get; set; }
    }
}
