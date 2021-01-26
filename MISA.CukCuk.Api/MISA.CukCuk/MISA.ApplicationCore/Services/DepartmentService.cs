using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{    
    /// <summary>
     /// Xử lý nghiệp vụ phòng ban
     /// </summary>
     /// CreatedBy: PDTAI (20/01/2021)
    public class DepartmentService:BaseService<Department>, IDepartmentService
    {
        #region Declare
        IBaseRepository<Department> _baseRepository;
        IDepartmentRepository _departmentRepository;
        #endregion

        #region Constructor
        public DepartmentService(IBaseRepository<Department> baseRepository, IDepartmentRepository departmentRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _departmentRepository = departmentRepository;
        }
        #endregion
    }
}
