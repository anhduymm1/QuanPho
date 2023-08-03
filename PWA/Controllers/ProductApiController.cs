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
        public IHttpActionResult getListProduct()
        {
            List<Products> products = new List<Products>();
            using (SqlConnection connection = new SqlConnection(PhoController.connectionString))
            {
                string sqlQuery = "select P.*, C.CategoryName from Product P INNER JOIN Category C ON P.CateID = C.CategoryID";
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
    }
}
