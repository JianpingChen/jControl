using System;
using System.Collections.Generic;

namespace MvcAppExample.Controllers
{
	public class FileRepository : IFileRepository
	{
		private Dictionary<Guid, FileStruct> _files;

		public FileRepository()
		{
			_files = new Dictionary<Guid, FileStruct>();
		}

		#region Implementation of IFileRepository

		public Guid SaveFile(byte[] fileContent, string contentType)
		{
			var fileId = Guid.NewGuid();
			_files[fileId] = new FileStruct {ContentType = contentType, FileContent = fileContent};
			return fileId;
		}

		public byte[] GetFileContent(Guid fileId)
		{
			return _files[fileId].FileContent;
		}

		public string GetFileContentType(Guid fileId)
		{
			return _files[fileId].ContentType;
		}

		public void DeleteFile(Guid fileId)
		{
			if (_files.ContainsKey(fileId))
			{
				_files.Remove(fileId);
			}
		}

		#endregion
	}

	public class FileStruct
	{
		public string ContentType { get; set; }
		public byte[] FileContent { get; set; }
	}
}