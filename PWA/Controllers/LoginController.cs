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
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(string username, string pass)
        {
            if (ModelState.IsValid)
            {

                bool checked_login = false;

                Users users = new Users();
                var f_password = GetMD5(pass);
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "SELECT top 1 * FROM Data_User where UserName = '" + username + "' and Pass = '" + f_password + "'";
                    using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                users.FullName = reader["FullName"].ToString();
                                users.UserName = reader["UserName"].ToString();
                                users.Role_ID = Convert.ToInt32(reader["Role_ID"]);
                                checked_login = true;
                            }

                        }
                    }
                }

                if (checked_login)
                {
                    //add session
                    Session["FullName"] = users.FullName;
                    Session["UserName"] = users.UserName;
                    Session["Role_ID"] = users.Role_ID;
                    return Redirect("Home");
                }
                else
                {
                    Session.Clear();
                    ViewBag.error = "Login failed";
                    return Redirect("Home");

                    //return RedirectToAction("Index");
                }
            }
            return View();
        }

        //create a string MD5
        public static string GetMD5(string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] fromData = Encoding.UTF8.GetBytes(str);
            byte[] targetData = md5.ComputeHash(fromData);
            string byte2String = null;

            for (int i = 0; i < targetData.Length; i++)
            {
                byte2String += targetData[i].ToString("x2");

            }
            return byte2String.ToUpper();
        }
    }
}