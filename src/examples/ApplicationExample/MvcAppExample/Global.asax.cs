using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Dependencies;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.Resolvers.SpecializedResolvers;
using Castle.Windsor;
using MvcAppExample.Configuration;
using MvcAppExample.Controllers;
using IDependencyResolver = System.Web.Mvc.IDependencyResolver;

namespace MvcAppExample
{
	public class MvcApplication : System.Web.HttpApplication
	{
		private static readonly IWindsorContainer _container = new WindsorContainer();

		public static IWindsorContainer Container
		{
			get { return _container; }
		}

		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();
			WebApiConfig.Register(GlobalConfiguration.Configuration);
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);

			_container.AddFacility<TypedFactoryFacility>();
			_container.Kernel.Resolver.AddSubResolver(new CollectionResolver(_container.Kernel));

			_container.Install(new ApplicationTypesInstaller());

			SetupControllerFactory(_container);
		}

		public void SetupControllerFactory(IWindsorContainer container)
		{
			DependencyResolver.SetResolver(new MyResolver(container));
			GlobalConfiguration.Configuration.DependencyResolver = new HttpDependencyResolver(container);
		}

		protected void Application_BeginRequest()
		{
			CultureInfo ci = new CultureInfo("en");
			if (Request.UserLanguages[0].Equals("fr"))
			{
				ci = new CultureInfo("fr");
			}
			System.Threading.Thread.CurrentThread.CurrentUICulture = ci;
			System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(ci.Name);
		}
	}

	public class HttpDependencyResolver : System.Web.Http.Dependencies.IDependencyResolver
	{
		private readonly IWindsorContainer _container;

		public HttpDependencyResolver(IWindsorContainer container)
		{
			_container = container;
		}

		#region Implementation of IDisposable

		public void Dispose()
		{
		}

		#endregion

		#region Implementation of IDependencyScope

		public object GetService(Type serviceType)
		{
			if (serviceType == typeof(IHttpControllerTypeResolver))
			{
				return new HttpControllerTypeResolver();
			}
			else if (serviceType == typeof(ContactController))
			{
				return _container.Resolve<ContactController>();
			}
			return null;
		}

		public IEnumerable<object> GetServices(Type serviceType)
		{
			if (serviceType == typeof(IHttpControllerTypeResolver))
			{
				return new object[] { new HttpControllerTypeResolver() };
			}
			return new object[0];
		}

		public IDependencyScope BeginScope()
		{
			return this;
		}

		#endregion
	}

	public class HttpControllerTypeResolver : IHttpControllerTypeResolver
	{
		#region Implementation of IHttpControllerTypeResolver

		public ICollection<Type> GetControllerTypes(IAssembliesResolver assembliesResolver)
		{
			return new Type[] {typeof (ContactController)};
		}

		#endregion
	}

	public class MyResolver : IDependencyResolver
	{
		private readonly IWindsorContainer _container;

		public MyResolver(IWindsorContainer container)
		{
			_container = container;
		}

		#region Implementation of IDependencyResolver

		public object GetService(Type serviceType)
		{
			if (serviceType == typeof(IControllerFactory))
			{
				return new ControllerFactory(_container);
			}
			return null;
		}

		public IEnumerable<object> GetServices(Type serviceType)
		{
			if (serviceType == typeof(IControllerFactory))
			{
				return new object[] { new ControllerFactory(_container) };
			}
			return new object[0];
		}

		#endregion
	}
}