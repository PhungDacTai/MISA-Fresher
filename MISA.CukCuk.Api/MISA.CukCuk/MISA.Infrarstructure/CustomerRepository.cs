
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration) : base(configuration)
        {

        }
        public Customer GetCustomerByCode(string customerCode)
        {
            var customer= _dbConnection.Query<Customer>($"SELECT*FROM Customer WHERE CustomerCode = '{customerCode}'", commandType: CommandType.Text).FirstOrDefault();
            return customer;
        }
    }
}
