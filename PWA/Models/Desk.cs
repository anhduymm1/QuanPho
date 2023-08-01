using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PWA.Models
{
    public class Desk
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int TableID { get; set; }
        public string TableName { get; set; }

        public int TableStatus { get; set; }
    }
}