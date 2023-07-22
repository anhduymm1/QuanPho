using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PWA.Models
{
    public class Users
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string FullName { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$")]
        public string Pass { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string Phone { get; set; }
        public int Role_ID { get; set; }

    }
}