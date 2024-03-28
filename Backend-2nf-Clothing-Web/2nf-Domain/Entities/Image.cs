using System.ComponentModel.DataAnnotations;

namespace _2nf_Domain.Entities
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        public Article Article { get; set; }
    }
}
