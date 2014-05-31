using System;
using System.Text;
using System.Web.Mvc;
using Castle.DynamicProxy;
using MvcAppExample.Contracts;
using MvcAppExample.ErrorHandling;

namespace MvcAppExample.Controllers
{
	public class ExceptionInterceptor: IInterceptor
	{
		private readonly IJsonDataParser _jsonDataParser;

		public ExceptionInterceptor(IJsonDataParser jsonDataParser)
		{
			_jsonDataParser = jsonDataParser;
		}

		public void Intercept(IInvocation invocation)
		{
			try
			{
				invocation.Proceed();
			}
			catch(AppException applicationException)
			{
				Controller controller = invocation.InvocationTarget as Controller;
				controller.Response.ContentType = "application/jason";
				controller.Response.ContentEncoding = Encoding.UTF8;
				controller.Response.Write(_jsonDataParser.Serialize(new ErrorResponse { ErrorMessage = applicationException.Message }));
			}
			catch (Exception)
			{
				Controller controller = invocation.InvocationTarget as Controller;
				controller.Response.ContentType = "application/jason";
				controller.Response.ContentEncoding = Encoding.UTF8;
				controller.Response.Write(_jsonDataParser.Serialize(new ErrorResponse { ErrorMessage = "Internal server error." }));
			}
		}

	}
}