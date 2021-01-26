using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Api.Controllers
{
    ///<summary>
    /// Api danh mục nhân viên
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public class EmployeesController : BaseEntityController<Employee>
    {
        #region Declare
        IEmployeeService _baseService;
        #endregion

        #region Constructor
        /// <summary>
        /// Hào khởi tạo
        /// </summary>
        /// <param name="baseService"></param>
        public EmployeesController(IEmployeeService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region Get
        /// <summary>
        /// Lọc danh sách qua tiêu chí (mã, họ tên, số điện thoại), phòng ban, vị trí làm việc
        /// </summary>
        /// <param name="specs"></param>
        /// <param name="departmentId"></param>
        /// <param name="positionId"></param>
        /// <returns></returns>
        [HttpGet("filter")]
        public IActionResult GetEmployeeFilter([FromQuery] string specs, [FromQuery] Guid? departmentId, [FromQuery] Guid? positionId)
        {
            return Ok(_baseService.GetEmployeesFilter(specs, departmentId, positionId));

        }

<<<<<<< HEAD
        /// <summary>
        /// Lấy đối tượng có mã nhân viên lớn nhất
        /// </summary>
        /// <returns>Đối tượng lấy được</returns>
        /// CreatedBy: PDTAI (23/01/2021)
=======
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
        [HttpGet("getcode")]
        public IActionResult GetEmployeeCode()
        {
            return Ok(_baseService.GetEmployeeCode());
        }
<<<<<<< HEAD
        #endregion
=======
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    }
}
