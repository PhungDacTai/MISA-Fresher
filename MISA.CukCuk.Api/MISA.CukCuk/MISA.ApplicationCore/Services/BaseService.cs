﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.ApplicationCore.Services
{
    /// <summary>
    /// Xử lý nghiệp vụ chung
    /// </summary>
    /// <typeparam name="TEntity">Đối tượng truyền vào</typeparam>
    /// CreatedBy: PDTAI (20/01/2021)
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        #region Declare
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult;
        #endregion

        #region Constructor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = Enums.MISACode.Success };
        }

        #endregion

        #region Method
        public virtual ServiceResult Add(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.AddNew;
            // Thực hiện validate
            var isValidate = Validate(entity);

            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Add(entity);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }

        }

        public ServiceResult Delete(Guid entityId)
        {
            _serviceResult.Data = _baseRepository.Delete(entityId);
            return _serviceResult;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return _baseRepository.GetEntitys();
        }

        public TEntity GetEntityId(Guid entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }

        public ServiceResult Update(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.Update;
            var isValidate = Validate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Update(entity);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }

        }

        /// <summary>
        /// Check validate các nghiệp vụ trùng, trống, ...
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        private bool Validate(TEntity entity)
        {
            var mesArrayError = new List<string>();
            var isValidate = true;
            // Đọc các property
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = string.Empty;
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                if (displayNameAttributes.Length > 0)
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }
                // Kiểm tra xem có attribute cần phải validate không, check bắt buộc nhập
                if (property.IsDefined(typeof(Required), false))
                {
                    // Check bắt buộc nhập

                    if (propertyValue == "")
                    {
                        isValidate = false;
                        mesArrayError.Add(string.Format(Properties.Resources.Msg_Required, displayName));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                        _serviceResult.ObjectName = displayName;
                    }
                }

                // Check trùng lặp
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    // Check trùng dữ liệu
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        mesArrayError.Add(string.Format(Properties.Resources.Msg_Duplicate, displayName));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                        _serviceResult.ObjectName = displayName;
                    }
                }

                // Check độ dài giới hạn
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    // Lấy độ dài đã khai báo
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Value;
                    var msg = (attributeMaxLength as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValidate = false;
                        mesArrayError.Add(msg ?? string.Format(Properties.Resources.Msg_MaxLength, length));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                    
                    }

                }

                // Check định dạng email
                if (property.IsDefined(typeof(EmailFormat), false))
                {
                    bool checkEmail = false;
                    if(propertyValue.ToString() != null && new EmailAddressAttribute().IsValid(propertyValue.ToString())){
                        checkEmail = true;
                    }
                    if (checkEmail == false)
                    {
                        isValidate = false;
                        mesArrayError.Add(Properties.Resources.Msg_EmailFormat);
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                        _serviceResult.ObjectName = "Email";
                    }
                }
            }
            _serviceResult.Data = mesArrayError;

            // Cho con validate thêm
            if (isValidate == true)
            {
                isValidate = ValidateCustom(entity);
            }
            return isValidate;
        }

        /// <summary>
        /// Hàm thực hiện kiểm tra dữ liệu/ nghiệp vụ tùy chỉnh
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        protected virtual bool ValidateCustom(TEntity entity)
        {
            return true;
        }
        #endregion
    }
}
