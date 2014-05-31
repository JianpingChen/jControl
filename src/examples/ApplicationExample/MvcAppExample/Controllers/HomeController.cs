using System.Linq;
using System.Web.Mvc;
using MvcAppExample.ViewModels;

namespace MvcAppExample.Controllers
{
    public class HomeController : Controller
    {
		public ActionResult Home()
		{
			var appViewModel = new AppViewModel();
			appViewModel.UserLocale = "en";
			if (Request.UserLanguages[0].StartsWith("fr"))
			{
				appViewModel.UserLocale = "fr";
			}
			return View(appViewModel);
		}

		public ActionResult About()
		{
			var appViewModel = new AppViewModel();
			appViewModel.UserLocale = "en";
			return View(appViewModel);
		}

		public ActionResult AboutFr()
		{
			var appViewModel = new AppViewModel();
			appViewModel.UserLocale = "fr";
			return View(appViewModel);
		}

		public ActionResult Doc()
		{
			return Redirect("/documentation/index.html");
		}

    }
}
