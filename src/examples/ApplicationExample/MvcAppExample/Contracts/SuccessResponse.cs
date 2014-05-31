namespace MvcAppExample.Contracts
{
	public class SuccessResponse : Response
	{
		public SuccessResponse()
		{
			ReturnCode = "Success";
		}

		public object Data { get; set; }
	}
}