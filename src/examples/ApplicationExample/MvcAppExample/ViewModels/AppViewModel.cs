namespace MvcAppExample.ViewModels
{
	public class AppViewModel
	{
		public string UserLocale { get; set; }
		public string AppVersion { get { return "1.0.0.0"; } }
	}
}