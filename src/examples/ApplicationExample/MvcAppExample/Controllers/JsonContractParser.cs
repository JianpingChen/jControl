using System.Web.Script.Serialization;

namespace MvcAppExample.Controllers
{
	public class JsonContractParser : IJsonDataParser
	{
		private readonly ITypeResolver _typeResolver;
		private readonly JavaScriptSerializer _javaScriptSerializer;

		public JsonContractParser(ITypeResolver typeResolver )
		{
			_typeResolver = typeResolver;
			_javaScriptSerializer = new JavaScriptSerializer(_typeResolver as JavaScriptTypeResolver)
			                        	{
			                        		MaxJsonLength = 2147483647,
			                        		RecursionLimit = 4096
			                        	};
		}

		public string Serialize(object model)
		{
			return _javaScriptSerializer.Serialize(model);
		}

		public T Deserialize<T>(string serializaedObject)
		{
			return _javaScriptSerializer.Deserialize<T>(serializaedObject);
		}
	}
}