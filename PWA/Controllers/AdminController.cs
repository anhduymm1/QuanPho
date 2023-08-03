using PWA.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PWA.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
      
        public ActionResult Index()
        {
            if (Session["Role_ID"] != null && (string)Session["Role_ID"] == "1")
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult Desk()
        {
            if (Session["Role_ID"] != null && (string)Session["Role_ID"] == "1")
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult Product()
        {
            if (Session["Role_ID"] != null && (string)Session["Role_ID"] == "1")
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }



    }
}