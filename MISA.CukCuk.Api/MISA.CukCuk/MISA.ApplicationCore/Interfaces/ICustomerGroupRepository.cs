using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerGroupRepository:IBaseRepository<CustomerGroup>
    {
        CustomerGroup GetCustomerGroupById(string customerGroupId);
    }
}
