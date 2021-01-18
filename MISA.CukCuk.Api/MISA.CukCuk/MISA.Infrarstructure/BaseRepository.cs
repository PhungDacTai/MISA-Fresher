using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;

namespace MISA.Infrarstructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>, IDisposable where TEntity : BaseEntity
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;
        #endregion

        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");//Kết nối DB qua appsetting.json
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        public int Add(TEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = MappingDbType(entity);
                    //Thực thi commandText
                    rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            //Trả về số bản ghi thêm mới được
            return rowAffects;
        }

        public int Delete(Guid entityId)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                //using khởi tạo đối tượng chạy xong tự giải phóng bộ nhớ
                rowAffects = _dbConnection.Execute($"DELETE FROM {_tableName} WHERE {_tableName}Id = '{entityId}'", commandType: CommandType.Text);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
                transaction.Commit();
            }
            //Trả về số bản ghi xóa được
            return rowAffects;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            //string _query = "SELECT c.CustomerId, c.CustomerCode, c.FullName, c.MemberCardCode, c.CustomerGroupId, c.DateOfBirth, c.Gender, " +
            //             "c.Email, c.PhoneNumber, c.CompanyName, c.CompanyTaxCode, c.Address, cg.CustomerGroupName " +
            //             "FROM Customer c INNER JOIN CustomerGroup cg ON c.CustomerGroupId = cg.CustomerGroupId WHERE c.CustomerId = CustomerId";
            //var a = $"{_tableName}Id";
            var entity = _dbConnection.Query<TEntity>($"SELECT * FROM {_tableName} WHERE {_tableName}Id = '{entityId}'", commandType: CommandType.Text).FirstOrDefault();
            //Trả dữ liệu cho client
            return entity;
        }

        public IEnumerable<TEntity> GetEntitys()
        {
            // Kết nối tới cơ sở dữ liệu
            // Khởi tạo các commandText
            //2. Lấy đối tượng kết nối DB
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi
            //Trả dữ liệu cho client
            return entities;
        }

        public int Update(TEntity entity)
        {
            var parameters = MappingDbType(entity);
            //Thực thi commandText
            var rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}ById", parameters, commandType: CommandType.StoredProcedure);//Query: Thực hiện thao tác câu lệnh, commandType: Kiểu câu lệnh thực thi

            //Trả về số bản ghi thêm mới được
            return rowAffects;
        }

        private DynamicParameters MappingDbType(TEntity entity)
        {
            // Xử lý các kiểu dữ liệu
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            return parameters;
        }

        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.AddNew)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} ='{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} ='{propertyValue}' AND {_tableName}Id <>'{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }

        /// <summary>
        /// // Chạy khi object không sử dụng nữa, phải implement IDispoable
        /// </summary>
        public void Dispose()
        {

            if (_dbConnection.State == ConnectionState.Open)
            {
                // Khi không dùng nữa tự động đóng kết nối
                _dbConnection.Close();
            }
        }
    }
}
