using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// </summary>
    /// CreatedBy: PDTAI (12/01/2021)
    public class Employee : BaseEntity
    {
        #region Property
        /// <summary>
        /// Id nhân viên
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên đầy đủ nhân viên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        public int Gender { get; set; }

        /// <summary>
        /// Chứng minh thư nhân dân, thẻ căn cước
        /// </summary>
        public string IdentifyCardNumber { get; set; }

        /// <summary>
        /// Ngày cấp
        /// </summary>
        public DateTime IssuedDate { get; set; }

        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string IssuedLocation { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalCardCode { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Mã vị trí công việc
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Tên vị trí công việc
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public Guid DepartmentId { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Lương cơ bản
        /// </summary>
        public int Salary { get; set; }

        /// <summary>
        /// Ngày gia nhập
        /// </summary>
        public DateTime? DateOfJoin { get; set; }

        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public string WorkStatus { get; set; }

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
