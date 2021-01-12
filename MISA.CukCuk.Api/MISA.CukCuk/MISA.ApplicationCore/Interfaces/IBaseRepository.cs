using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        IEnumerable<TEntity> GetEntitys();
        TEntity GetEntityById(Guid entityId);
        int Add(TEntity entity);
        int Update(TEntity entity);
        int Delete(Guid entityId);
        TEntity GetEntityByProperty(string propertyName, object propertyValue );
    }
}
