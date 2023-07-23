using PWA.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace PWA.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
            //if (Session["UserName"] != null)
            //{
            //    return View();
            //}
            //else
            //{
            //    return Redirect("Login");
            //}
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
       

    }
}