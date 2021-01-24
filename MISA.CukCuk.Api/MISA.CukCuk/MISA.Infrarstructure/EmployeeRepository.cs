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
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
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
            var input = (specs != null) ? specs : string.Empty;
            paramaters.Add("@EmployeeCode", input, DbType.String);
            paramaters.Add("@FullName", input, DbType.String);
            paramaters.Add("@PhoneNumber", input, DbType.String);
            paramaters.Add("@DepartmentId", departmentId, DbType.String);
            paramaters.Add("@PositionId", positionId, DbType.String);
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeesFilter", paramaters, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }
    }
}
