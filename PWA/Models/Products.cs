using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PWA.Models
{
    public class Products
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int ProductID { get; set; }
        public int CateID { get; set; }
        public string ProductName { get; set; }
        public string NameSearch { get; set; }
        public int ProductPrice { get; set; }
        public string ProductUnit { get; set; }
        public string CategoryName { get; set; }

    }
}