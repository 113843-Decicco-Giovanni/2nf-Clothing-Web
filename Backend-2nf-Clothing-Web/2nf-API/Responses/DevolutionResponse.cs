using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class DevolutionResponse
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Detail { get; set; }
        /// <summary>
        /// "0": Pendiente -
        /// "1": En Curso -
        /// "2": Finalizado -
        /// "3": Cancelado
        /// </summary>
        public string State { get; set; }
    }
}
