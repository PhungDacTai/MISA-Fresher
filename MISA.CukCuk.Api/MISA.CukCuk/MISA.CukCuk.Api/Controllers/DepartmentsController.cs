using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Api.Controllers
{
    ///<summary>
    /// Api danh mục nhân viên
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public class DepartmentsController : BaseEntityController<Department>
    {
        #region Delare
        IBaseService<Department> _baseService;
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="baseService"></param>
        public DepartmentsController(IBaseService<Department> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
