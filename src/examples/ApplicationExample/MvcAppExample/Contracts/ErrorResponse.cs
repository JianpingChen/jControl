namespace MvcAppExample.Contracts
{
	public class ErrorResponse : Response
	{
		public ErrorResponse()
		{
			ErrorMessage = "Internal Server Error";
		}
		public string ErrorMessage { get; set; }
	}
}