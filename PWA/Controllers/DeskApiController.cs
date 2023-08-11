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
    public class DeskApiController : ApiController
    {
        [Route("getListDesk")]
        [HttpPost]
        public IHttpActionResult ListDesk()
        {
            List<Desk> desks = new List<Desk>();
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT * FROM Table_Area";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Desk desk = new Desk
                            {
                                TableID = Convert.ToInt32(reader["TableID"]),
                                TableName = reader["TableName"].ToString(),
                                TableStatus = Convert.ToInt32(reader["TableStatus"])
                            };

                            desks.Add(desk);
                        }
                    }
                }
            }
            return Json(desks);
        }

        [Route("getListDeskByWhere")]
        [HttpPost]
        public IHttpActionResult getListDeskByWhere(Desk desk1)
        {
            List<Desk> desks = new List<Desk>();
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = " SELECT * FROM Table_Area ";

                if (desk1.TableStatus.ToString() == "0")
                {
                    sqlQuery += " where TableStatus = 0 ";
                }
                else if (desk1.TableStatus.ToString() == "1")
                {
                    sqlQuery += " where TableStatus = 1";
                }

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Desk desk = new Desk
                            {
                                TableID = Convert.ToInt32(reader["TableID"]),
                                TableName = reader["TableName"].ToString(),
                                TableStatus = Convert.ToInt32(reader["TableStatus"])
                            };

                            desks.Add(desk);
                        }
                    }
                }
            }
            return Json(desks);
        }

        public string getMaxIDTable()
        {
            string maxID = "";
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT max(TableID) FROM Table_Area";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    maxID = command.ExecuteScalar().ToString();

                }
            }
            if (maxID == "") maxID = "0";
            return maxID;
        }

        public bool checkTableNameUnique(string tableName)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Table_Area where TableName = '" + tableName + "'";
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

        public bool checkTableIDUnique(string tableID)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Table_Area where TableID = '" + tableID + "'";
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

        [Route("createDesk")]
        [HttpPost]
        public bool createDesk(Desk desks)
        {
            bool check = false;
            if (checkTableNameUnique(desks.TableName) == false)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "INSERT INTO Table_Area (TableID, TableName ,TableStatus) VALUES('" + (Convert.ToInt32(getMaxIDTable()) + 1).ToString() + "', '" + desks.TableName + "','" + Convert.ToInt32(desks.TableStatus) + "')";
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

        [Route("updateDesk")]
        [HttpPost]
        public bool updateDesk(Desk desks)
        {
            bool check = false;

            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "UPDATE Table_Area SET TableName = @TableName, TableStatus = @TableStatus WHERE TableID = @TableID";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    try
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@TableName", desks.TableName);
                        command.Parameters.AddWithValue("@TableStatus", desks.TableStatus);
                        command.Parameters.AddWithValue("@TableID", desks.TableID);
                        command.ExecuteNonQuery();
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

        [Route("deleteDesk")]
        [HttpPost]
        public bool deleteDesk(Desk desk)
        {
            bool check = false;
            if (checkTableIDUnique(desk.TableID.ToString()) == true)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "Delete from Table_Area where TableID= '" + desk.TableID + "'";
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


        [Route("statiticDesk")]
        [HttpPost]
        public IHttpActionResult statiticDesk()
        {
            dynamic statiticDesk1 = null;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT COUNT(*)  tatca,  ( select COUNT(*) FROM Table_Area WHERE TableStatus = 1 ) dadat, ( select COUNT(*) FROM Table_Area WHERE TableStatus = 0 ) chuadat FROM Table_Area";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                             statiticDesk1 = new
                            {
                                All = Convert.ToInt32(reader["tatca"]),
                                Active = Convert.ToInt32(reader["dadat"]),
                                Disable = Convert.ToInt32(reader["chuadat"])
                            };

                        }
                    }
                }
            }
            return Json(statiticDesk1);
        }

       
    }
}