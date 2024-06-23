namespace _2nf_API.Requests
{
    public class ShipmentRequest
    {
        public string? Floor { get; set; }
        public string? Appartement { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string? Details { get; set; }
    }
}
