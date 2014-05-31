namespace MvcAppExample.Contracts
{
	public class DeleteProductRequest : Request
	{
		public DeleteProductRequest()
		{
			ProductId = -1;
		}
		public int ProductId { get; set; }
	}
}