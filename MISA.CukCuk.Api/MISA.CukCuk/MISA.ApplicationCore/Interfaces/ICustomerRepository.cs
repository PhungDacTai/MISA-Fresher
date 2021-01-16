using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (11/01/2021)
    public interface ICustomerRepository : IBaseRepository<Customer>
    {
        /// <summary>
        /// Lấy thông tin khách hàng theo mã
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Khách hàng có mã truyền vào</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        Customer GetCustomerByCode(string customerCode);
    }
}
