using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;

namespace MISA.ApplicationCore.Middwares
{
    /// <summary>
    /// Convert dữ liệu kiểu Guid
    /// </summary>
    /// CreatedBy: PDTAI (20/01/2021)
    public class MySqlGuidTypeHandler : SqlMapper.TypeHandler<Guid>
    {
        public override void SetValue(IDbDataParameter parameter, Guid guid)
        {
            parameter.Value = guid.ToString();
        }

        public override Guid Parse(object value)
        {
            return Guid.Parse(value.ToString());
        }
    }
}
