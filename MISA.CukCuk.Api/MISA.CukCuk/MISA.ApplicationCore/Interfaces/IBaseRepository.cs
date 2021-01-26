using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface base dùng chung
    /// </summary>
    /// <typeparam name="TEntity">Đối tượng chung</typeparam>
    /// CreatedBy: PhungDacTai (14/01/2021)
    public interface IBaseRepository<TEntity>
    {
        #region Method
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        /// <returns>Danh sách đối tượng</returns>
        /// 
        IEnumerable<TEntity> GetEntitys();

        /// <summary>
        /// Lấy toàn bộ dữ liệu qua Id
        /// </summary>
        /// <param name="entityId">Id đối tượng truyền vào</param>
        /// <returns>Đối tượng có Id tìm được</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        TEntity GetEntityById(Guid entityId);

        /// <summary>
        /// Thêm dữ liệu vào database
        /// </summary>
        /// <param name="entity">Đối tượng truyền vào</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        int Add(TEntity entity);

        /// <summary>
        /// Sửa dữ liệu trong database
        /// </summary>
        /// <param name="entity">Đối tượng truyền vào</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        int Update(TEntity entity);

        /// <summary>
        /// Xóa dữ liệu trong database qua Id của đối tượng
        /// </summary>
        /// <param name="entityId">Id của đối tượng cần xóa</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: PDTAI (12/01/2021)
        int Delete(Guid entityId);

        /// <summary>
        /// Lấy đặc tính của đối tượng phân biệt thêm và sửa
        /// </summary>
        /// <param name="entity">Đối tượng truyền vào</param>
        /// <param name="property">Đặc tính của đối tượng</param>
        /// <returns>Đối tượng</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
        #endregion
    }
}
