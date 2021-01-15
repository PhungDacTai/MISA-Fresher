using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Api.Controllers
{

    public class CustomerGroupsController : BaseEntityController<CustomerGroup>
    {
        ICustomerGroupService _baseService;
        public CustomerGroupsController(ICustomerGroupService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
