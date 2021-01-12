using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository
    {
        /// <summary>
        /// Lấy danh sách nhân viên
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        int AddEmployee(Employee employee);
        int UpdateEmployee(Employee employee);
        int DeleteEmployee(Guid employeeId);
        Employee GetEmployeeByCode(string employeeCode);
    }
}
