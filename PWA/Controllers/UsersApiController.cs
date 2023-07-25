using PWA.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PWA.Controllers
{
    public class UsersApiController : ApiController
    {
         
        [Route("getListUser")]
        [HttpGet]
        public IHttpActionResult ListUser()
        {
            List<Users> users = new List<Users>();

            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT * FROM Data_User";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Users user = new Users
                            {
                                UserID = Convert.ToInt32(reader["UserID"]),
                                FullName = reader["FullName"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                Phone = reader["Phone"].ToString(),
                            };

                            users.Add(user);
                        }
                    }
                }
            }

            // Trả về dữ liệu dưới dạng JSON
            return Json(users);
        }
    }
}
