using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    public class DepartmentService:BaseService<Department>, IDepartmentService
    {
        IBaseRepository<Department> _baseRepository;
        IDepartmentRepository _departmentRepository;
        public DepartmentService(IBaseRepository<Department> baseRepository, IDepartmentRepository departmentRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _departmentRepository = departmentRepository;
        }
    }
}
