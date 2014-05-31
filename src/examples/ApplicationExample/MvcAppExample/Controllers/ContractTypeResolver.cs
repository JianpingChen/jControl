using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Web.Script.Serialization;

namespace MvcAppExample.Controllers
{
	public class ContractTypeResolver : SimpleTypeResolver, ITypeResolver
	{
		private static readonly Dictionary<string, Type> _knownTypes= new Dictionary<string, Type>();

		public ContractTypeResolver()
		{
			if (_knownTypes.Count == 0)
			{
				var executingAssembly = Assembly.GetExecutingAssembly();
				AddTypesInAssembly(executingAssembly);
			}
		}

		private static void AddTypesInAssembly(Assembly assembly)
		{
			foreach (var type in assembly.GetTypes().Where(t => !t.IsInterface && !t.IsAbstract))
			{
				if ((string.IsNullOrEmpty(type.FullName))
					|| (!type.FullName.Contains(".Contracts.")))
					continue;

				_knownTypes[type.Name] = type;
				Debug.WriteLine("Known type: " + type.FullName);
			}
		}

		public override Type ResolveType(string id)
		{
			var result = Type.GetType(id);
			if (result != null || _knownTypes.TryGetValue(id, out result))
			{
				return result;
			}
			throw new ArgumentException("Unable to resolve [" + id + "]", "id");
		}

		public override string ResolveTypeId(Type type)
		{
			if (type == null)
			{
				throw new ArgumentNullException("type");
			}

			return type.Name;
		}
	}
}