using _2nf_API.Entities;

namespace _2nf_API.Responses
{
    public class RefundResponse
    {
        public int Id { get; set; }
        public int SaleId { get; set; }
        public string Reason { get; set; }
        /// <summary>
        /// "0": Pendiente -
        /// "1": Creado -
        /// "2": Aprobado -
        /// "3": Cancelado
        /// </summary>
        public int State { get; set; }
    }
}
