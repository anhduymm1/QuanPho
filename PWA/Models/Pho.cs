using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PWA.Models
{
    public class Pho
    {
        public int ProductID { get; set; }
        public int CateID { get; set; }
        public string ProductName { get; set; }
        public string NameSearch { get; set; }
        public string ProductPrice { get; set; }
        public string ProductUnit { get; set; }
    
    }
}