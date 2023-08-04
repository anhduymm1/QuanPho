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
    public class ProductApiController : ApiController
    {
        [Route("getListProduct")]
        [HttpPost]
        public IHttpActionResult getListProduct(Products product1)
        {
            List<Products> products = new List<Products>();
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT P.*, C.CategoryName from Product P INNER JOIN Category C ON P.CateID = C.CategoryID where P.CateID = '" + product1.CateID + "' order by P.ProductID desc ";

                if (product1.CateID == -1)
                {
                    sqlQuery = "select P.*, C.CategoryName from Product P INNER JOIN Category C ON P.CateID = C.CategoryID order by P.ProductID desc";
                }
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Products product = new Products
                            {
                                ProductID = Convert.ToInt32(reader["ProductID"]),
                                CateID = Convert.ToInt32(reader["CateID"]),
                                ProductName = reader["ProductName"].ToString(),
                                ProductPrice = Convert.ToInt32(reader["ProductPrice"]),
                                ProductUnit = reader["ProductUnit"].ToString(),
                                CategoryName = reader["CategoryName"].ToString()
                            };

                            products.Add(product);
                        }
                    }
                }
            }
            return Json(products);
        }

        public string getMaxIDProduct()
        {
            string maxID = "";
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT max(ProductID) FROM Product";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    maxID = command.ExecuteScalar().ToString();

                }
            }
            if (maxID == "") maxID = "0";
            return maxID;
        }

        public bool checkProductIDUnique(int productID)
        {
            bool flat = false;
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "SELECT top (1) * FROM Product where ProductID = '" + productID + "'";
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

        [Route("createProduct")]
        [HttpPost]
        public bool createProduct(Products products)
        {
            bool check = false;

            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = @"INSERT INTO Product (ProductID, CateID , ProductName,ProductPrice, ProductUnit) VALUES
                                      ('" + (Convert.ToInt32(getMaxIDProduct()) + 1).ToString() + "', '" + products.CateID + "','" + products.ProductName + "','" + products.ProductPrice + "','" + products.ProductUnit + "')";
                try
                {
                    using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                    check = true;
                }
                catch(Exception ex)
                {
                    check = false;
                }

            }
            return check;
        }

        [Route("updateProduct")]
        [HttpPost]
        public bool updateProduct(Products products)
        {
            bool check = false;

            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "UPDATE Product SET CateID = @CateID, ProductName = @ProductName, ProductPrice= @ProductPrice, ProductUnit = @ProductUnit  WHERE ProductID = @ProductID";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    try
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@CateID", products.CateID);
                        command.Parameters.AddWithValue("@ProductName", products.ProductName);
                        command.Parameters.AddWithValue("@ProductPrice", products.ProductPrice);
                        command.Parameters.AddWithValue("@ProductUnit", products.ProductUnit);
                        command.Parameters.AddWithValue("@ProductID", products.ProductID);
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

        [Route("deleteProduct")]
        [HttpPost]
        public bool deleteProduct(Products products)
        {
            bool check = false;
            if (checkProductIDUnique(products.ProductID) == true)
            {
                using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
                {
                    string sqlQuery = "Delete from Product where ProductID= '" + products.ProductID + "'";
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
