using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục nhóm khách hàng 
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public interface ICustomerGroupRepository : IBaseRepository<CustomerGroup>
    {
        /// <summary>
        /// Lấy thông tin nhóm khách hàng qua Id
        /// </summary>
        /// <param name="customerGroupId">Id nhóm khách hàng</param>
        /// <returns>Nhóm khách hàng tìm được</returns>
        CustomerGroup GetCustomerGroupById(string customerGroupId);
    }
}
