﻿using System.ComponentModel.DataAnnotations;

namespace _2nf_API.Entities
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        public Article Article { get; set; }
    }
}
