using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PWA.Models
{
    public class OrderTable
    {
        public int OrderID { get; set; }
        public int TableID { get; set; }
        public int UserID { get; set; } 
        public int PaymentStatus { get; set; } 
        public int TotalPrice { get; set; } 
        public string OrderNote { get; set; }
        public int DetailID { get; set; }
        public int ProductID { get; set; }
        public int OTQuantity { get; set; }
        public int Detail_Status { get; set; }
        public int OTPrice { get; set; }
        public string DetailNote { get; set; }
    }
}