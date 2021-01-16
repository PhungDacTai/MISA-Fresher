using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Danh mục vị trí công việc
    /// </summary>
    /// CreatedBy: PDTAI (15/01/2021)
    public class Position : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id vị trí làm việc
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Tên vị trí công việc
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string Decription { get; set; }

        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion
    }
}
