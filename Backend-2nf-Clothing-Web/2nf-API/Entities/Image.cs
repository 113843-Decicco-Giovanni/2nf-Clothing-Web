using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace _2nf_API.Entities
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        [JsonIgnore]
        public Article Article { get; set; }
    }
}
