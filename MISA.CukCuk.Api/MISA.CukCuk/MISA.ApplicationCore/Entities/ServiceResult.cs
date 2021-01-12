using System;
using System.Collections.Generic;
using System.Text;
using MISA.ApplicationCore.Enums;

namespace MISA.ApplicationCore.Entities
{
    public class ServiceResult
    {
        public object Data { get; set; }// Dữ liệu mong muốn truyền về
        public string Messenger { get; set; }// Câu thông báo
        public MISACode MISACode { get; set; }// Mã trả về trạng thái
    }
}
