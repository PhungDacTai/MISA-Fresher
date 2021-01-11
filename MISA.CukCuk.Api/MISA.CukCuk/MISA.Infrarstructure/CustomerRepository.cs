using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;

namespace MISA.Infrarstructure
{
    public class CustomerRepository : ICustomerRepository
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        #endregion

        public CustomerRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");//Kết nối DB qua appsetting.json
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #region Method
        public int AddCustomer(Customer customer)
        {
            var parameters = MappingDbType(customer);
            //Thực thi commandText
            var rowAffects = _dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi

            //Trả về số bản ghi thêm mới được
            return rowAffects;
        }

        public int DeleteCustomer(Guid customerId)
        {
            var res = _dbConnection.Execute("Proc_DeleteCustomerById", new {CustomerId = customerId }, commandType: CommandType.StoredProcedure);
            return res;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            //Lấy dữ liệu từ DB
            var res = _dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public Customer GetCustomerById(Guid customerId)
        {
            //Lấy dữ liệu từ DB
            var customer = _dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();// Nếu có trả về phần tử đầu tiên, không thì null
            return customer;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới cơ sở dữ liệu
            // Khởi tạo các commandText
            //2. Lấy đối tượng kết nối DB
            var customers = _dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            //Trả dữ liệu cho client
            return customers;
        }

        public int UpdateCustomer(Customer customer)
        {
            // Kết nối tới cơ sở dữ liệu
            //2. Lấy đối tượng kết nối DB

            
            var parameters = MappingDbType(customer);

            //Thực thi commandText
            var rowAffects = _dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi

            //Trả về số bản ghi thêm mới được
            return rowAffects;
        }

        /// <summary>
        /// Xử lý mapping kiểu dữ liệu 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        private DynamicParameters MappingDbType<TEntity>(TEntity entity)
        {
            // Xử lý các kiểu dữ liệu
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            return parameters;
        }
        #endregion
    }
}
