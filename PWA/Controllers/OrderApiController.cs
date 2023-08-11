using PWA.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;

namespace PWA.Controllers
{
    public class OrderApiController : ApiController
    {
        [Route("addOrderTable")]
        [HttpPost]
        public bool addOrderTable(List<OrderTable> orderTables)
        {
            bool check = false;

            if (checkTableOrderIDUnique((Convert.ToInt32(getMaxIDTableOrder()) + 1).ToString()) == false)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    int orderID = Convert.ToInt32(getMaxIDTableOrder());
                    string sqlQuery = @"INSERT INTO Order_Table (OrderID, TableID ,UserID, PaymentStatus, TotalPrice) 
                                         VALUES(" + (orderID + 1).ToString() + "," + orderTables[0].TableID + "," + orderTables[0].UserID + "," + 0 + "," + countTotalQty(orderTables) + ")";
                    try
                    {
                        using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                        {
                            connection.Open();

                            check = true;
                            if (check == true)
                            {
                                check = false;
                                if (addOrderDetail(orderTables, orderID+1) == true)
                                {
                                    if(updateTableStatus(orderTables[0].TableID) == true)
                                    {
                                        command.ExecuteNonQuery();
                                        check = true;
                                    }
                                    
                                }
                            }
                        }
                    }
                    catch(Exception ex)
                    {
                        check = false;
                    }

                }
            }
            return check;
        }

        public bool addOrderDetail(List<OrderTable> orderTables, int orderID)
        {
            bool check = false;
            foreach (var orderTable in orderTables)
            {
                if (checkOrderDetailIDUnique((Convert.ToInt32(getMaxIDOrderDetail()) + 1).ToString()) == false)
                {
                    using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                    {
                        string sqlQuery = @"INSERT INTO Order_Detail (DetailID, OrderID ,ProductID, OTQuantity, Detail_Status, OTPrice) 
                                         VALUES(" + (Convert.ToInt32(getMaxIDOrderDetail()) + 1).ToString() + "," + orderID + "," + orderTable.ProductID+", "+ orderTable.OTQuantity + "," + 0+ "," + orderTable.OTPrice * orderTable.OTQuantity + ")";
                            try
                        {
                            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                            {
                                connection.Open();
                                command.ExecuteNonQuery();
                            }
                            check = true;
                           
                        }
                        catch (Exception ex)
                        {
                            check = false;
                        }

                    }
                }
            }

            return check;
        }

        public int countTotalQty(List<OrderTable> orderTables)
        {
            int total = 0;
            foreach (var orderTable in orderTables)
            {
                total += orderTable.OTPrice * orderTable.OTQuantity;
            }
            return total;
        }
        public string getMaxIDTableOrder()
        {
            string maxID = "";
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT max(OrderID) FROM Order_Table";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    maxID = command.ExecuteScalar().ToString();

                }
            }
            if (maxID == "") maxID = "0";
            return maxID;
        }

        public string getMaxIDOrderDetail()
        {
            string maxID = "";
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT max(DetailID) FROM Order_Detail";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    maxID = command.ExecuteScalar().ToString();

                }
            }
            if (maxID == "") maxID = "0";
            return maxID;
        }

        public bool checkTableOrderIDUnique(string orderID)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Order_Table where OrderID = '" + orderID + "'";
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
        public bool checkOrderDetailIDUnique(string orderDetailID)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Order_Detail where DetailID = '" + orderDetailID + "'";
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

        public bool updateTableStatus (int TableID)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "Update Table_Area set TableStatus = 1 where TableID = '" + TableID + "'";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        flat = true;
                    }
                    catch
                    {
                        flat = false;
                    }



                }
            }
            return flat;
        }

        [Route("tableOrderDetail")]
        [HttpPost]
        public IHttpActionResult tableOrderDetail(OrderTable order)
        {
            List<OrderTable> orderTables = new List<OrderTable>();
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = @"select OD.*, P.ProductName from Order_Table OT inner join Order_Detail OD 
                                    on OT.OrderID = OD.OrderID inner join Product P on OD.ProductID  = P.ProductID
                                    where OT.TableID = '" + order.TableID + "'";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            OrderTable orderTable = new OrderTable
                            {
                                DetailID = Convert.ToInt32(reader["DetailID"]),
                                OrderID = Convert.ToInt32(reader["OrderID"]),
                                ProductID = Convert.ToInt32(reader["ProductID"]),
                                OTQuantity = Convert.ToInt32(reader["OTQuantity"]),
                                Detail_Status = Convert.ToInt32(reader["Detail_Status"]),
                                OTPrice = Convert.ToInt32(reader["OTPrice"]),
                                DetailNote = reader["DetailNote"].ToString(),
                                ProductName = reader["ProductName"].ToString(),
                            };

                            orderTables.Add(orderTable);
                        }
                    }
                }
            }
            return Json(orderTables);
        }
    }
}
