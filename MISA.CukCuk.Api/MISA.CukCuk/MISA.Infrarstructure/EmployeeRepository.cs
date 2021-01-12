using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;

namespace MISA.Infrarstructure
{
    public class EmployeeRepository : IEmployeeRepository
    {

        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        #endregion

        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");//Kết nối DB qua appsetting.json
            _dbConnection = new MySqlConnection(_connectionString);
        }

        public int AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int DeleteEmployee(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployeeById(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            // Kết nối tới cơ sở dữ liệu
            // Khởi tạo các commandText
            //2. Lấy đối tượng kết nối DB
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployees", commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            //Trả dữ liệu cho client
            return employees;
        }

        public int UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
