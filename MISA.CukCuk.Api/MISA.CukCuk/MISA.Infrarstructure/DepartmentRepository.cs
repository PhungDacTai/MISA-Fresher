using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    /// <summary>
    /// Xử lý tương tác database phòng ban
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class DepartmentRepository:BaseRepository<Department>,IDepartmentRepository
    {
        #region Constructor
        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion
    }
}
