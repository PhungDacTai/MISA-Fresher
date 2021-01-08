using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Api.Models;

namespace MISA.CukCuk.Api.Api
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var customer = new Customer();
            
            return StatusCode(200, customer.listCustomers());
        }

        [HttpPost]
        public IActionResult Post([FromBody] Customer customer) { 
            return StatusCode(200, customer.addCustomer());
        }

        [HttpGet("{id}/{name}")]
        public string Get(int id, string name)
        {
            return "name";
        }
        [HttpPut]
        public string Put()
        {
            return "c";
        }

        [HttpDelete]
        public string Delete()
        {
            return "d";
        }
    }
}