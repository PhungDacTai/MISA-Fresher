using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration configuration):base(configuration)
        {

        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var employee = _dbConnection.Query<Employee>($"SELECT*FROM Employeee WHERE EmployeeCode = '{employeeCode}'", commandType: CommandType.Text).FirstOrDefault();
            return employee;
        }

        public Employee GetEmployeeCode()
        {
            var employeeCode = _dbConnection.Query<Employee>("Proc_GetEmployeeCodes", commandType: CommandType.StoredProcedure).FirstOrDefault();
            return employeeCode;
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            // Build tham số đầu vào cho store
            var paramaters = new DynamicParameters();
            paramaters.Add("EmployeeCode", specs);
            paramaters.Add("FullName", specs);
            paramaters.Add("PhoneNumber", specs);
            paramaters.Add("DepartmentId", departmentId);
            paramaters.Add("PositionId", positionId);
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeesPaging", paramaters, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }
    }
}
