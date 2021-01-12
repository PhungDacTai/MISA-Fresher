using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
    {
        IEnumerable<TEntity> GetEntities();
        TEntity GetEntityId(Guid entityId);
        ServiceResult Add(TEntity entity);
        ServiceResult Update(TEntity entity);
        ServiceResult Delete(Guid entityId);
    }
}
