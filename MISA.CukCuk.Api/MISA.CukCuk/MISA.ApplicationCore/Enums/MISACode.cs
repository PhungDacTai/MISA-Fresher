using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// Xác định trạng thái của việc validate
    /// </summary>
    /// CreatedBy: PDTAI (12/01/2021)
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
        Success = 200,

        /// <summary>
        /// Lỗi exception
        /// </summary>
        Exception = 500
    }
    /// <summary>
    /// Xác định trạng thái của Object
    /// </summary>
    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete =3,
    }
}
