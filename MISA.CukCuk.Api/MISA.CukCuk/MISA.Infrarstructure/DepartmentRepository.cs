using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    public class DepartmentRepository:BaseRepository<Department>,IDepartmentRepository
    {
        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
