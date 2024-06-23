using System.ComponentModel.DataAnnotations.Schema;

namespace _2nf_API.Entities
{
    public class Shipment
    {
        public int Id { get; set; }
        public string? Floor { get; set; }
        public Sale Sale { get; set; }
        public string? Appartament { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        /// <summary>
        /// 0 para pendiente, 1 para procesado
        /// </summary>
        public int ShipmentState { get; set; }
        public string? Details { get; set; }
        public long? TrackingId { get; set; }
        public string? Service {  get; set; }
    }
}
