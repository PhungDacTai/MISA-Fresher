using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;

namespace MISA.ApplicationCore
{
    /// <summary>
    /// Xử lý nghiệp vụ nhân viên
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region Declare
        IBaseRepository<Employee> _baseRepository;
        IEmployeeRepository _employeeRepository;
        #endregion

        #region Constructor
        public EmployeeService(IBaseRepository<Employee> baseRepository, IEmployeeRepository employeeRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _employeeRepository = employeeRepository;
        }
<<<<<<< HEAD
        #endregion

        #region Method
=======

>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
        public Employee GetEmployeeCode()
        {
            return _employeeRepository.GetEmployeeCode();
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            return _employeeRepository.GetEmployeesFilter(specs, departmentId, positionId);
        }
        #endregion
    }
}
