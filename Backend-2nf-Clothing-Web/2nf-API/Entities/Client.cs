namespace _2nf_API.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? SecondName {  get; set; }
        public string Surname { get; set; }
        public string? SecondSurname {  get; set; }
        public int DocId { get; set; }
        public string Street {  get; set; }
        public int StreetNumber {  get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string PostalCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public User User { get; set; }
    }
}
