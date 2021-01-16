using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Enums;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Khai báo các thuộc tính trả về khi thực hiện các yêu cầu
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    public class ServiceResult
    {
        #region
        /// <summary>
        /// Dữ liệu mong muốn trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Câu thông báo
        /// </summary>
        public string Messenger { get; set; }

        /// <summary>
        /// Mã trả về trạng thái
        /// </summary>
        public MISACode MISACode { get; set; }
        #endregion
    }
}
