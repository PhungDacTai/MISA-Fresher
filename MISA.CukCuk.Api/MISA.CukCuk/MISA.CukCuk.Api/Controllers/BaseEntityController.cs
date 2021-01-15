using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;

        public BaseEntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        /// <summary>
        /// Lấy dữ liệu khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: 
        [HttpGet()] //Dùng phương thức Get lấy dữ liệu chuẩn Resful (endpoints)
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();
            return Ok(entities);
        }



        /// <summary>
        /// Lấy danh sách khách hàng theo id
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <returns>Khách hàng có id truyền vào</returns>
        /// CreatedBy: PDTAI (10/1/2021)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityId(Guid.Parse(id));
            //Trả dữ liệu cho client
            return Ok(entity);
        }



        /// <summary>
        /// Thêm một đối tượng vào danh sách
        /// </summary>
        /// <param name="entity">Đối tượng được thêm</param>
        /// <returns>Khách hàng mới thêm</returns>
        [HttpPost]
        public IActionResult Post(TEntity entity)
        {
            var serviceResult = _baseService.Add(entity);
            if(serviceResult.MISACode == ApplicationCore.Enums.MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else
            {
                return Ok(serviceResult);
            }
            
        }


        /// <summary>
        /// Sửa khách hàng qua id truyền vào
        /// </summary>
        /// <param name="id">id của đối tượng</param>
        /// <param name="entity"></param>
        /// <returns>Khách hàng mới sửa</returns>
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] string id, [FromBody] TEntity entity)
        {
           var keyProperty =  entity.GetType().GetProperty($"{typeof(TEntity).Name}Id");
            if(keyProperty.PropertyType == typeof(Guid))
            {
                keyProperty.SetValue(entity, Guid.Parse(id));
            }else if (keyProperty.PropertyType == typeof(int))
            {
                keyProperty.SetValue(entity, int.Parse(id));
            }
            else
            {
                keyProperty.SetValue(entity, id);
            }

            var serviceResult = _baseService.Update(entity);
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else
            {
                return Ok(serviceResult);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var rowAffects = _baseService.Delete(id);
            //Trả dữ liệu cho client
            return Ok(rowAffects);
        }
    }
}
