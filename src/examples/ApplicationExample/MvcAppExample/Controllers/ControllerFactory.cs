using System;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.Windsor;

namespace MvcAppExample.Controllers
{
	public class ControllerFactory : DefaultControllerFactory
	{
		private readonly IWindsorContainer _container;

		public ControllerFactory(IWindsorContainer container)
		{
			_container = container;
		}

		protected override IController GetControllerInstance(RequestContext context, Type controllerType)
		{
			if (controllerType != null)
			{
				return _container.Resolve(controllerType) as IController;
			}
			return base.GetControllerInstance(context, controllerType);
		}

		public override void ReleaseController(IController controller)
		{
			_container.Release(controller);

			base.ReleaseController(controller);
		}
	}
}