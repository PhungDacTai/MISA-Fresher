﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Primarykey]
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        [@MaxLength(20, "Mã nhân viên không vượt quá 20 ký tự")]
        [@Required]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên đầy đủ nhân viên
        /// </summary>
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        public int Gender { get; set; }

        /// <summary>
        /// Chứng minh thư nhân dân, thẻ căn cước
        /// </summary>
        [DisplayName("Số CMTND/ Căn cước")]
        [CheckDuplicate]
        [@Required]
        public string IdentifyCardNumber { get; set; }

        /// <summary>
        /// Ngày cấp
        /// </summary>
        public DateTime? IssuedDate { get; set; }

        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string IssuedLocation { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [EmailFormat]
        [DisplayName("Email")]
        [@Required]
        public string Email { get; set; }

        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalCardCode { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [DisplayName("Số điện thoại")]
        [@Required]
        [CheckDuplicate]
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
