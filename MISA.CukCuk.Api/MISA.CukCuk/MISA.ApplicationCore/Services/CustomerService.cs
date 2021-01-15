using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;

namespace MISA.ApplicationCore
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        IBaseRepository<Customer> _baseRepository;
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(IBaseRepository<Customer> baseRepository, ICustomerRepository customerRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _customerRepository = customerRepository;
        }

        #endregion
        #region
        protected override bool ValidateCustom(Customer entity)
        {
            //Validate thêm của con truyền vào
            return base.ValidateCustom(entity);
        }

        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerByGroup(CustomerGroup groupId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
