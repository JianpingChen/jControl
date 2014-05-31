using System;
using System.Web.Mvc;

namespace MvcAppExample.Controllers
{
	public class TypedJsonResult : JsonResult
	{
		private readonly IJsonDataParser _jsonDataParser;

		public TypedJsonResult(IJsonDataParser jsonDataParser)
		{
			_jsonDataParser = jsonDataParser;
		}

		public override void ExecuteResult(ControllerContext context)
		{
			if (context == null)
			{
				throw new ArgumentNullException("context");
			}

			if ((JsonRequestBehavior == JsonRequestBehavior.DenyGet)
			  && string.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
			{
				throw new InvalidOperationException("JsonRequest GetNotAllowed");
			}

			var response = context.HttpContext.Response;

			response.ContentType = !string.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

			if (ContentEncoding != null)
			{
				response.ContentEncoding = ContentEncoding;
			}

			if (Data != null)
			{
				string serialize = _jsonDataParser.Serialize(Data);
				response.Write(serialize);
			}
		}
	}
}