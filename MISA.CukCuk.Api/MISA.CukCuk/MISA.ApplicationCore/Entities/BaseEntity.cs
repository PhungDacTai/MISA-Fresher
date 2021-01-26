using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
 
    /// <summary>
    /// Lớp dùng chung thêm các thuộc tính check validate
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    public class BaseEntity
    {
        #region Property
        public EntityState EntityState { get; set; } = EntityState.AddNew;
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }


    #region Attribute validate dữ liệu

    /// <summary>
    /// Thuộc tính check bắt buộc nhập
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    /// <summary>
    /// Thuộc tính check trùng lặp
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate : Attribute
    {

    }

    /// <summary>
    /// Thuộc tính check khóa chính
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class Primarykey : Attribute
    {

    }

    /// <summary>
    /// Thuộc tính hiển thị thông tin để thông báo
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name = null)
        {
            this.Name = name;
        }
    }

    /// <summary>
    /// Thuộc tính check độ dài các trường
    /// </summary>
    /// CreatedBy: PDTAI (14/01/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int Value { get; set; }
        public string ErrorMsg { get; set; }
        public MaxLength(int length, string errorMsg)
        {
            this.Value = length;
            this.ErrorMsg = errorMsg;
        }
    }
    /// <summary>
    /// Check email
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class EmailFormat : Attribute
    {
        public string Email { get; set; }
        public EmailFormat()
        {

        }
    }
    #endregion
}
