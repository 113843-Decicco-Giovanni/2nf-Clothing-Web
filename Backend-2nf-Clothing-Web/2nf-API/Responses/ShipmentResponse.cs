namespace _2nf_API.Responses
{
    public class ShipmentResponse
    {
        public int Id { get; set; }
        public string? Floor { get; set; }
        public string? Appartament { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        /// <summary>
        /// 0 para pendiente, 1 para procesado, 2 para finalizado
        /// </summary>
        public string ShipmentState { get; set; }
        public string? Details { get; set; }
        public SaleResponse Sale { get; set; }
        public string Service { get; set; }
        public long TrackingId { get; set; }
    }
}
