using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        ServiceResult AddEmployee(Employee employee);
        ServiceResult UpdateEmployee(Employee employee);
        ServiceResult DeleteEmployee(Guid employeeId);

        /// <summary>
        /// Lấy dữ liệu danh sách nhân viên theo các tiêu chí
        /// </summary>
        /// <param name="specs">Tiêu chí theo mã, tên hoặc số điện thoại của nhân viên</param>
        /// <param name="departmentId">Id của phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên theo các tiêu chí</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
    }
}
