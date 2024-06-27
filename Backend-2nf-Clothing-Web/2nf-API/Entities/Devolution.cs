namespace _2nf_API.Entities
{
    public class Devolution
    {
        public int Id { get; set; }
        public int ClientDoc {  get; set; }
        public Shipment Shipment { get; set; }
        public string Reason { get; set; }
        public string? Detail { get; set; }
        /// <summary>
        /// "0": Pendiente -
        /// "1": En Curso -
        /// "2": Finalizado -
        /// "3": Cancelado
        /// </summary>
        public int State { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}
