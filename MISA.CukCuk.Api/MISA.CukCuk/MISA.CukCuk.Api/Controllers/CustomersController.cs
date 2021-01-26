using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (12/01/2021)
    public class CustomersController : BaseEntityController<Customer>
    {
        #region Declare
        ICustomerService _baseService;
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="baseService"></param>
        public CustomersController(ICustomerService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region Get
        /// <summary>
        /// Lọc dữ liệu qua các tiêu chí
        /// </summary>
        /// <param name="specs">Tiêu chí truyên vào</param>
        /// <returns>Danh sách trả về</returns>
        [HttpGet("filter")]
        public IActionResult GetCustomersFilter([FromQuery] string specs)
        {
            return Ok(_baseService.GetCustomersFilter(specs));

        }
        #endregion
    }
}
