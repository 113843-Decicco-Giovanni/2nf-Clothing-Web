﻿using System.ComponentModel.DataAnnotations;

namespace _2nf_Domain.Entities
{
    public class Article
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public ArticleType Type { get; set; }
        public List<Image> Images { get; set; }
    }
}
