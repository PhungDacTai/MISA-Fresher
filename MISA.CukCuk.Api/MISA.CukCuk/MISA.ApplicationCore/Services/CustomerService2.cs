using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    public class CustomerService2 : BaseService<Customer>, ICustomerService
    {
        IBaseRepository<Customer> _customerRepository;
        #region Constructor
        public CustomerService2(IBaseRepository<Customer> customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public ServiceResult AddCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
        #endregion
        public ServiceResult DeleteCustomer(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerByGroup(CustomerGroup groupId)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomerById(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            throw new NotImplementedException();
        }

        public ServiceResult UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
