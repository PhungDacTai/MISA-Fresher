using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// MISACode để xác định trạng thái của việc validate
    /// </summary>
    /// CreatedBy: PDTAI (11/01/2021)
    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,

        /// <summary>
        /// Dữ liệu không hợp lệ
        /// </summary>
        NotValid = 999,

        /// <summary>
        /// Thành công
        /// </summary>
        Success = 200
    }
}
