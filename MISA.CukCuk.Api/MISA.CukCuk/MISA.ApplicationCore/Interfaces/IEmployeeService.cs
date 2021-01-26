using System;
using System.Collections.Generic;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục nhân viên
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public interface IEmployeeService : IBaseService<Employee>
    {
        #region Method
        /// <summary>
        /// Lấy dữ liệu danh sách nhân viên theo các tiêu chí
        /// </summary>
        /// <param name="specs">Tiêu chí theo mã, tên hoặc số điện thoại của nhân viên</param>
        /// <param name="departmentId">Id của phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên theo các tiêu chí</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);


        /// <summary>
        /// Lấy mã của các đối tượng đã sắp xếp giảm
        /// </summary>
        /// <returns>Mã đối tượng/returns>
        /// CreatedBy: PDTAI (23/01/2021)
        Employee GetEmployeeCode();
<<<<<<< HEAD
        #endregion
=======
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    }
}
