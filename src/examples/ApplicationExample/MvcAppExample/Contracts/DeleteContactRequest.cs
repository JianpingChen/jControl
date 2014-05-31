namespace MvcAppExample.Contracts
{
	public class DeleteContactRequest : Request
	{
		public DeleteContactRequest()
		{
			ContactId = -1;
		}
		public int ContactId { get; set; }
	}
}