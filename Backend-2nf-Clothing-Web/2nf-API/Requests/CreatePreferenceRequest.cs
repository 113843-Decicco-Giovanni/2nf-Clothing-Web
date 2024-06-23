namespace _2nf_API.Requests
{
    public class CreatePreferenceRequest
    {
        public int ClientId {  get; set; }
        public List<SaleDetailRequest> Details { get; set; }
        public string Floor { get; set; }
        public string Appartement { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ShipmentDetails { get; set; }
    }
}
