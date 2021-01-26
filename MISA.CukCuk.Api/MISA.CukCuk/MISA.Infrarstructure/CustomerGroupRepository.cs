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
    /// <summary>
    /// Xử lý tương tác database nhóm khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class CustomerGroupRepository : BaseRepository<CustomerGroup>, ICustomerGroupRepository
    {
        #region Constructor
        public CustomerGroupRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion

        #region Method
        public CustomerGroup GetCustomerGroupById(string customerGroupId)
        {
            var customerGroup = _dbConnection.Query<CustomerGroup>($"SELECT*FROM Customer WHERE CustomerCode = '{customerGroupId}'", commandType: CommandType.Text).FirstOrDefault();
            return customerGroup;
        }
        #endregion
    }
}
