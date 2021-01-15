using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    public class CustomerGroupRepository : BaseRepository<CustomerGroup>, ICustomerGroupRepository
    {
        public CustomerGroupRepository(IConfiguration configuration) : base(configuration)
        {

        }
        public CustomerGroup GetCustomerGroupById(string customerGroupId)
        {
            var customerGroup = _dbConnection.Query<CustomerGroup>($"SELECT*FROM Customer WHERE CustomerCode = '{customerGroupId}'", commandType: CommandType.Text).FirstOrDefault();
            return customerGroup;
        }
    }
}
