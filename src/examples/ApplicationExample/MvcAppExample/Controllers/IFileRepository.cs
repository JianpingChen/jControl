using System;

namespace MvcAppExample.Controllers
{
	public interface IFileRepository
	{
		Guid SaveFile(byte[] fileContent, string contentType);
		byte[] GetFileContent(Guid fileId);
		string GetFileContentType(Guid fileId);
		void DeleteFile(Guid fileId);
	}
}
