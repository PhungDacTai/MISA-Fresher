using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class CustomerGroup:BaseEntity
    {
        public Guid CustomerGroupId { get; set; }
        public string CustomerGroupName { get; set; }
        public string Decription { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
