using PWA.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static PWA.Models.Pho;

namespace PWA.Controllers
{
    public class PhoController : Controller
    {
        public static string connectionString = ConfigurationManager.ConnectionStrings["PhoDBContext"].ConnectionString;

        //static IList<Student> studentList = new List<Student>{
        //        new Student() { StudentId = 1, StudentName = "John", Age = 18 } ,
        //        new Student() { StudentId = 2, StudentName = "Steve",  Age = 21 } ,
        //        new Student() { StudentId = 3, StudentName = "Bill",  Age = 25 } ,
        //        new Student() { StudentId = 4, StudentName = "Ram" , Age = 20 } ,
        //        new Student() { StudentId = 5, StudentName = "Ron" , Age = 31 } ,
        //        new Student() { StudentId = 4, StudentName = "Chris" , Age = 17 } ,
        //        new Student() { StudentId = 4, StudentName = "Rob" , Age = 19 }
        //    };
        // GET: Student
        public ActionResult Index()
        {
            List<Pho> phos = new List<Pho>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Product";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Pho pho = new Pho
                            {
                                ProductID = Convert.ToInt32(reader["ProductID"]),
                                ProductName = reader["ProductName"].ToString(),
                                ProductPrice = reader["ProductPrice"].ToString()
                            };

                            phos.Add(pho);
                        }

                    }
                }
            }
            return View(phos);
        }

    }
}