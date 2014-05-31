namespace MvcAppExample.Controllers
{
	public interface IJsonDataParser
	{
		string Serialize(object model);
		T Deserialize<T>(string serializaedObject);
	}
}