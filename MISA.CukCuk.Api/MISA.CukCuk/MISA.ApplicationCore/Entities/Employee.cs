using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Employee : BaseEntity
    {
        /// <summary>
        /// Thông tin nhân viên
        /// </summary>
        /// CreatedBy: PDTAI (12/01/2021)
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string IdentifyCardNumber { get; set; }
        public DateTime IssuedDate { get; set; }
        public string IssuedLocation { get; set; }
        public string Email { get; set; }
        public string PersonalCardCode { get; set; }
        public string PhoneNumber { get; set; }
        public Guid PositionId { get; set; }
        public string PositionName { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int Salary { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public string WorkStatus { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
