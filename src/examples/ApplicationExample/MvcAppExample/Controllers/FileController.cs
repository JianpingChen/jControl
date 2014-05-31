using System;
using System.Web.Mvc;

namespace MvcAppExample.Controllers
{
    public class FileController : Controller
    {
    	private readonly IFileRepository _fileRepository;

    	public FileController(IFileRepository fileRepository)
		{
			_fileRepository = fileRepository;
		}

        public FileResult GetFile(string fileId)
        {
        	var guidId = Guid.Parse(fileId);
        	return File(_fileRepository.GetFileContent(guidId), _fileRepository.GetFileContentType(guidId));
        }
    }
}
