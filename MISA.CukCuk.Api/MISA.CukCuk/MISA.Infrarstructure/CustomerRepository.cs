
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    /// <summary>
    /// Xử lý tương tác database khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        #region Constructor
        public CustomerRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion

        #region Method
        public Customer GetCustomerByCode(string customerCode)
        {
            var customer= _dbConnection.Query<Customer>($"SELECT*FROM Customer WHERE CustomerCode = '{customerCode}'", commandType: CommandType.Text).FirstOrDefault();
            return customer;
        }

        public List<Customer> GetCustomersFilter(string specs)
        {
            {
                // Build tham số đầu vào cho store
                var paramaters = new DynamicParameters();
                paramaters.Add("CustomerCode", specs);
                paramaters.Add("FullName", specs);
                paramaters.Add("PhoneNumber", specs);
                var customers = _dbConnection.Query<Customer>("Proc_GetCustomersPaging", paramaters, commandType: CommandType.StoredProcedure).ToList();
                return customers;
            }
        }
        #endregion
    }
}
