using System.ComponentModel.DataAnnotations;

namespace _2nf_Domain.Entities
{
    public class ArticleType
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
