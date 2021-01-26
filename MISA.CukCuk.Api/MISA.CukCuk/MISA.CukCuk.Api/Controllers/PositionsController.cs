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
    /// Api danh mục nhóm vị trí làm việc
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public class PositionsController : BaseEntityController<Position>
    {
        #region Delare
        IBaseService<Position> _baseService;
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="baseService"></param>
        public PositionsController(IBaseService<Position> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
