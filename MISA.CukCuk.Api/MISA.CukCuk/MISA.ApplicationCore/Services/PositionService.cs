using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    public class PositionService:BaseService<Position>, IPositionService
    {
        IBaseRepository<Position> _baseRepository;
        IPositionRepository _positionRepository;
        public PositionService(IBaseRepository<Position> baseRepository, IPositionRepository positionRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _positionRepository = positionRepository;
        }
    }
}
