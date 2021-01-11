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
    public interface ICustomerRepository
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Lấy khách hàng qua khóa chính
        /// </summary>
        /// <param name="customerId">Khóa chính khách hàng</param>
        /// <returns>Khách hàng tìm được</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        Customer GetCustomerById(Guid customerId);

        /// <summary>
        /// Thêm khách hàng
        /// </summary>
        /// <param name="customer">Đối tượng khách hàng</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        int AddCustomer(Customer customer);

        /// <summary>
        /// Cập nhật khách hàng
        /// </summary>
        /// <param name="customer">Đối tượng khách hàng</param>
        /// <returns>Số bản ghi bị thay đổi</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        int UpdateCustomer(Customer customer);

        /// <summary>
        /// Xóa khách hàng qua khóa chính
        /// </summary>
        /// <param name="customerId">Khóa chính khách hàng</param>
        /// <returns>Số bản ghi bị thay đổi</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        int DeleteCustomer(Guid customerId);

        /// <summary>
        /// Lấy khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng truyền vào</param>
        /// <returns>Khách hàng tìm được qua mã</returns>
        /// CreatedBy: PDTAI (11/01/2021)
        Customer GetCustomerByCode(string customerCode);
    }
}
