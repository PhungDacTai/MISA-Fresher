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
    ///<summary>
    /// Api danh mục nhóm khách hàng
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public class CustomerGroupsController : BaseEntityController<CustomerGroup>
    {
        #region Declare
        ICustomerGroupService _baseService;
        #endregion

        #region Custructor
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="baseService"></param>
        public CustomerGroupsController(ICustomerGroupService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
