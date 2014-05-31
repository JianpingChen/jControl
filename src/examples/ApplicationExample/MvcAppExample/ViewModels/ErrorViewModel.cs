using System;

namespace MvcAppExample.ViewModels
{
	public class ErrorViewModel
	{
		public ErrorViewModel(string errorMessage)
		{
			ReturnCode = "Failed";
			ReturnMessage = errorMessage;
		}

		public string ReturnCode { get; set; }
		public string ReturnMessage { get; set; }
	}
}