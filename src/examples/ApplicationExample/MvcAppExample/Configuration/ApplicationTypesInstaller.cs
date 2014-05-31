using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using MvcAppExample.Controllers;

namespace MvcAppExample.Configuration
{
	public class ApplicationTypesInstaller : IWindsorInstaller
	{
		public void Install(IWindsorContainer container, IConfigurationStore store)
		{
			RegisterInterfaceImplementations(container);

			RegisterControllers(container);
		}

		private static void RegisterControllers(IWindsorContainer container)
		{
			container.Register(
				Component.For<HomeController>().LifeStyle.Transient,
				Component.For<ServerController>().LifeStyle.Transient,
				Component.For<ContactController>().LifeStyle.Transient,
				Component.For<FileController>().LifeStyle.Transient
				);
		}

		private static void RegisterInterfaceImplementations(IWindsorContainer container)
		{
			container.Register(Component.For<IDataRepository>().ImplementedBy<DataRepository>().LifeStyle.Singleton);
			container.Register(Component.For<IFileRepository>().ImplementedBy<FileRepository>().LifeStyle.Singleton);
			container.Register(Component.For<ITypeResolver>().ImplementedBy<ContractTypeResolver>().LifeStyle.Singleton);
			container.Register(Component.For<IJsonDataParser>().ImplementedBy<JsonContractParser>().LifeStyle.Transient);
			container.Register(Component.For<ExceptionInterceptor>().Named("ExceptionInterceptor").LifeStyle.Transient);
		}
	}
}