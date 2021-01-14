using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public ServiceResult AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public ServiceResult DeleteEmployee(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployeeById(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return _employeeRepository.GetEmployees();
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            return _employeeRepository.GetEmployeesFilter(specs, departmentId, positionId);
        }

        public ServiceResult UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
