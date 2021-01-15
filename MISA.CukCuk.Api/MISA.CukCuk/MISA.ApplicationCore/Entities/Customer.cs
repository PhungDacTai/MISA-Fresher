using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    public class Customer : BaseEntity
    {
        #region Declare
        string _customerCode = Properties.Resources.CustomerCode;
        #endregion

        #region Constructor
        #endregion

        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Primarykey]
        public Guid CustomerId { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>

        [CheckDuplicate]
        [DisplayName("Mã khách hàng")]
        [MaxLength(20,"Mã khách hàng không vượt quá 20 ký tự")]
        [Required]
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên đầy đủ
        /// </summary>
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        /// <summary>
        /// Số thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }

        /// <summary>
        /// Khóa chính nhóm khách hàng
        /// </summary>
        public Guid CustomerGroupId { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính 0-Nữ, 1-Nam, 2-Khác
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [CheckDuplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Mã số thuế công ty
        /// </summary>
        public string CompanyTaxCode { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Nhày chỉnh sửa gần nhất
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa gần nhất
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion

        #region Method
        #endregion
    }
}
