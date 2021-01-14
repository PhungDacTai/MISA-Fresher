using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Properties;
using Newtonsoft.Json;

namespace MISA.CukCuk.Api.Middwares
{
    //Middware can thiệp các request gửi lên gửi về giữa client và server
    public class ErrorHandlingMiddleWare
    {
        private readonly RequestDelegate next;
        public ErrorHandlingMiddleWare(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context/*other dependencies)*/)
        {
            try
            {
                await next(context);
            }catch(Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError;//500 if unexpected

            var result = JsonConvert.SerializeObject(
                new ServiceResult
                {
                    Data = new { devMsg = ex.Message, cusMsg = "Có lỗi xảy ra vui lòng liên hệ MISA" },
                    Messenger = "Có lỗi xảy ra vui lòng liên hệ MISA",
                    MISACode = ApplicationCore.Enums.MISACode.Exception
                } ) ;
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
