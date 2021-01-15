﻿using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    public class CustomerGroupService :BaseService<CustomerGroup>, ICustomerGroupService
    {
        IBaseRepository<CustomerGroup> _baseRepository;
        ICustomerGroupRepository _customerGroupRepository;
        public CustomerGroupService(IBaseRepository<CustomerGroup> baseRepository, ICustomerGroupRepository customerGroupRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _customerGroupRepository = customerGroupRepository;
        }
    }
}
