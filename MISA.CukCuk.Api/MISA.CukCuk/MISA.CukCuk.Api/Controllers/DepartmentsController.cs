using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Api.Controllers
{
    public class DepartmentsController : BaseEntityController<Employee>
    {
        IBaseService<Employee> _baseService;
        public DepartmentsController(IBaseService<Employee> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
