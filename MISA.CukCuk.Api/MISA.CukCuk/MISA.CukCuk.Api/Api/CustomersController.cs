using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Api.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Api
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy dữ liệu khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: 
        [HttpGet()] //Dùng phương thức Get lấy dữ liệu chuẩn Resful (endpoints)
        public IActionResult Get()
        {
            //Kết nối DB
            //1. Chuỗi kết nối
            var connectionString = "Host=103.124.92.43;" +
                "Port=3306;" +
                "Database=MISACukCuk_MF658_PDTAI;" +
                "User Id=nvmanh;" +
                "Password=12345678";
            //2. Lấy đối tượng kết nối DB
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            //Lấy dữ liệu từ DB
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            //Trả dữ liệu cho client
            return Ok(customers);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo id
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <returns>Khách hàng có id truyền vào</returns>
        /// CreatedBy: PDTAI (10/1/2021)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            //Kết nối DB
            //1. Chuỗi kết nối
            var connectionString = "Host=103.124.92.43;" +
                "Port=3306;" +
                "Database=MISACukCuk_MF658_PDTAI;" +
                "User Id=nvmanh;" +
                "Password=12345678";
            //2. Lấy đối tượng kết nối DB
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            //Lấy dữ liệu từ DB
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            //Trả dữ liệu cho client
            return Ok(customer);
        }

        /// <summary>
        /// Thêm một đối tượng vào danh sách
        /// </summary>
        /// <param name="customer">Đối tượng được thêm</param>
        /// <returns>Khách hàng mới thêm</returns>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            // Validate dữ liệu
            //Check bắt buộc nhập
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được để trống",
                    Code = 999,
                };
                return BadRequest(msg);
            }

            // Check trùng mã
            //1. Chuỗi kết nối
            var connectionString = "Host=103.124.92.43;Port=3306;Database=MISACukCuk_MF658_PDTAI;User Id=nvmanh; Password=12345678";
            //2. Lấy đối tượng kết nối DB
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            //Lấy dữ liệu từ DB
            var res = dbConnection.Query("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure);
            if (res.Count() > 0)
            {
                return BadRequest("Mã khách hàng đã tồn tại");
            }

            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            //Lấy dữ liệu từ DB
            var rowAffects = dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            if (rowAffects > 0)
            {
                return Created("add", customer);
            }
            else
            {
                return NoContent();
            }

        }


        /// <summary>
        /// Sửa khách hàng qua id truyền vào
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <param name="customer"></param>
        /// <returns>Khách hàng mới sửa</returns>
        [HttpPut("{id}")]
        public IActionResult Put(string id, Customer customer)
        {
            // Validate dữ liệu
            //Check bắt buộc nhập
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được để trống",
                    Code = 999,
                };
                return BadRequest(msg);
            }

            // Check trùng mã
            //1. Chuỗi kết nối
            var connectionString = "Host=103.124.92.43;Port=3306;Database=MISACukCuk_MF658_PDTAI;User Id=nvmanh; Password=12345678";
            //2. Lấy đối tượng kết nối DB
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            //Lấy dữ liệu từ DB
            var res = dbConnection.Query("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure);
            if (res.Count() > 0)
            {
                return BadRequest("Mã khách hàng đã tồn tại");
            }

            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            //Lấy dữ liệu từ DB
            var rowAffects = dbConnection.Execute("Proc_UpdateCustomerById", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            if (rowAffects > 0)
            {
                return Created("add", customer);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            //Kết nối DB
            //1. Chuỗi kết nối
            var connectionString = "Host=103.124.92.43;Port=3306;Database=MISACukCuk_MF658_PDTAI;User Id=nvmanh; Password=12345678";
            //2. Lấy đối tượng kết nối DB
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            //Lấy dữ liệu từ DB
            var rowAffects = dbConnection.Execute("Proc_DeleteCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
                                                                                                                                                //Trả dữ liệu cho client
            if (rowAffects > 0)
            {
                return Created("delete", rowAffects);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
