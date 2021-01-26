using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrarstructure
{
    /// <summary>
    /// Xử lý tương tác database vị trí làm việc
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class PositionRepository: BaseRepository<Position>, IPositionRepository
    {
        #region Constructor
        public PositionRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion
    }
}
