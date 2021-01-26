using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    /// <summary>
    /// Xử lý nghiệp vụ vị trí làm việc
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class PositionService:BaseService<Position>, IPositionService
    {
        #region Declare
        IBaseRepository<Position> _baseRepository;
        IPositionRepository _positionRepository;
        #endregion

        #region Constructor
        public PositionService(IBaseRepository<Position> baseRepository, IPositionRepository positionRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _positionRepository = positionRepository;
        }
        #endregion
    }
}
