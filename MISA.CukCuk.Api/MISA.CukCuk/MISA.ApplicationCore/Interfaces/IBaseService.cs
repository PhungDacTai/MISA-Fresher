using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Entities;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface base dùng chung
    /// </summary>
    /// <typeparam name="TEntity">Đối tượng chung</typeparam>
    /// CreatedBy: PhungDacTai (14/01/2021)
    public interface IBaseService<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách các đối tượng
        /// </summary>
        /// <returns>Danh sách đối tượng</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        IEnumerable<TEntity> GetEntities();

        /// <summary>
        /// Lấy đối tượng qua Id truyền vào
        /// </summary>
        /// <param name="entityId">Id của đối tượng</param>
        /// <returns>Đối tượng lấy được</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        TEntity GetEntityId(Guid entityId);

        /// <summary>
        /// Thêm đối tượng vào Database
        /// </summary>
        /// <param name="entity">Đối tượng muốn thêm</param>
        /// <returns>Các trạng thái thông báo trả về được cài đặt trong ServiceResult</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        ServiceResult Add(TEntity entity);

        /// <summary>
        /// Sửa đối tượng trong Database
        /// </summary>
        /// <param name="entity">Đối tượng muốn sửa</param>
        /// <returns>Các trạng thái thông báo trả về được cài đặt trong ServiceResult</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        ServiceResult Update(TEntity entity);

        /// <summary>
        /// Xóa đối tượng trong Database
        /// </summary>
        /// <param name="entityId">Id của đối tượng muốn xóa</param>
        /// <returns>Các trạng thái thông báo trả về được cài đặt trong ServiceResult</returns>
        /// CreatedBy: PDTAI (14/01/2021)
        ServiceResult Delete(Guid entityId);
    }
}
