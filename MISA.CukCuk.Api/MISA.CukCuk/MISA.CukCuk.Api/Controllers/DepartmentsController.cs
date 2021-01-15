﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Api.Controllers
{
    public class DepartmentsController : BaseEntityController<Department>
    {
        IBaseService<Department> _baseService;
        public DepartmentsController(IBaseService<Department> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
