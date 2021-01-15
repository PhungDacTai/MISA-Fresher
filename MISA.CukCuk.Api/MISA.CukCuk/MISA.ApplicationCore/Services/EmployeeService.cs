using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;

namespace MISA.ApplicationCore
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IBaseRepository<Employee> _baseRepository;
        IEmployeeRepository _employeeRepository;

        public EmployeeService(IBaseRepository<Employee> baseRepository, IEmployeeRepository employeeRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _employeeRepository = employeeRepository;
        }
        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            return _employeeRepository.GetEmployeesFilter(specs, departmentId, positionId);
        }

    }
}
