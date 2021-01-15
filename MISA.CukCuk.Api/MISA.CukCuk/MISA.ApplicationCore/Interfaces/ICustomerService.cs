using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService:IBaseService<Customer>
    {
        /// <summary>
        /// Lấy dữ liệu phân trang
        /// </summary>
        /// <param name="limit">Giới hạn bao nhiêu bản ghi</param>
        /// <param name="offset">Tổng số bản ghi</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        IEnumerable<Customer> GetCustomerPaging(int limit, int offset);

        /// <summary>
        /// Lấy danh sách khách hàng theo nhóm khách hàng
        /// </summary>
        /// <param name="groupId">id nhóm khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        IEnumerable<Customer> GetCustomerByGroup(CustomerGroup groupId);
    }
}
