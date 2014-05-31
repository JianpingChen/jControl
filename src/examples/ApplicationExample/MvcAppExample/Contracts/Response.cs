namespace MvcAppExample.Contracts
{
	public class Response
	{
		public Response()
		{
			ReturnCode = "Error";
		}
		public string ReturnCode { get; set; }
	}
}