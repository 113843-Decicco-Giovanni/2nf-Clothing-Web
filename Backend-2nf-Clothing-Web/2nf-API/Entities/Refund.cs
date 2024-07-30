namespace _2nf_API.Entities
{
    public class Refund
    {
        public int Id { get; set; }
        public long RefundId { get; set; }
        public int ClientDoc { get; set; }
        public Sale Sale { get; set; }
        public string Reason { get; set; }
        /// <summary>
        /// "0": Pendiente -
        /// "1": En proceso -
        /// "2": Finalizado
        /// </summary>
        public int State { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}