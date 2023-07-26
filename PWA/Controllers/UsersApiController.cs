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
        [HttpPost]
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
                            string roleid = "";
                            if (reader["Role_ID"].ToString() == "1") {
                                roleid = "Admin";
                            }
                            else
                            {
                                roleid = "User";
                            }
                            Users user = new Users
                            {

                                UserID = Convert.ToInt32(reader["UserID"]),
                                FullName = reader["FullName"].ToString(),
                                UserName = reader["UserName"].ToString(),
                                Phone = reader["Phone"].ToString(),
                                Role_ID = roleid
                            };

                            users.Add(user);
                        }
                    }
                }
            }

            // Trả về dữ liệu dưới dạng JSON
            return Json(users);
        }

        public string getMaxIDUser()
        {
            string maxID = "";
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT max(UserID) FROM Data_User";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    maxID = command.ExecuteScalar().ToString();

                }
            }
            return maxID;
        }

        public bool checkUserNameUnique( string username)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Data_User where UserName = '"+username+"'";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            flat = true;
                        }
                    }

                }
            }
            return flat;
        }

        [Route("createUser")]
        [HttpPost]
        public bool createUser(Users users)
        {
            bool check = false;
            if(checkUserNameUnique(users.UserName) == false)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "INSERT INTO Data_User (UserID, FullName ,UserName ,Pass , Phone, Role_ID) VALUES('" + (Convert.ToInt32(getMaxIDUser()) + 1).ToString() + "', '" + users.FullName + "','" + users.UserName + "','" + LoginController.GetMD5(users.Pass) + "','" + users.Phone + "','" + users.Role_ID + "')";
                    try
                    {
                        using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                        {
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                        check = true;
                    }
                    catch
                    {
                        check = false;
                    }

                }
            }
           
            return check;
        }

        [Route("deleteUser")]
        [HttpPost]
        public bool deleteUser(Users users)
        {
            bool check = false;
            if (checkUserNameUnique(users.UserName) == true)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "Delete from Data_User where UserName= '" + users.UserName + "'";
                    try
                    {
                        using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                        {
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                        check = true;
                    }
                    catch
                    {
                        check = false;
                    }
                }
            }
            return check;
        }
    }
}
