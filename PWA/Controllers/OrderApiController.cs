using PWA.Models;
using System;
using System.Collections.Generic;
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
        public IHttpActionResult addOrderTable(List<OrderTable> orderTables)
        {
            return Json(orderTables);
        }
    }
}
