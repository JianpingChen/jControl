using System;

namespace MvcAppExample.Controllers
{
	public interface ITypeResolver
	{
		Type ResolveType(string id);
		string ResolveTypeId(Type type);
	}
}