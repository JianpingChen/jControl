using System;

namespace MvcAppExample.ErrorHandling
{
	public class AppException : Exception
	{
		public AppException(string message)
			: base(message)
		{
		}
	}
}