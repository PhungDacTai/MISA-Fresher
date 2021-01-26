using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    /// <summary>
    /// Xử lý nghiệp vụ nhóm khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class CustomerGroupService :BaseService<CustomerGroup>, ICustomerGroupService
    {
        #region Declare
        IBaseRepository<CustomerGroup> _baseRepository;
        ICustomerGroupRepository _customerGroupRepository;
        #endregion

        #region Method
        public CustomerGroupService(IBaseRepository<CustomerGroup> baseRepository, ICustomerGroupRepository customerGroupRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _customerGroupRepository = customerGroupRepository;
        }
        #endregion
    }
}
