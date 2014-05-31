using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Castle.Core;
using MvcAppExample.Contracts;
using MvcAppExample.ErrorHandling;
using MvcAppExample.ViewModels;

namespace MvcAppExample.Controllers
{
	[Interceptor("ExceptionInterceptor")]
    public class ServerController : Controller
    {
		private const string ReturnCodeSuccess = "Success";
		private readonly IDataRepository _dataRepository;
		private readonly IFileRepository _fileRepository;
		private readonly IJsonDataParser _jsonDataParser;

    	protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
		{
			return new TypedJsonResult(_jsonDataParser) { Data = data, ContentType = contentType, ContentEncoding = contentEncoding, JsonRequestBehavior = behavior };
		}

		private JsonResult ToJson(object data)
		{
			return Json(data, "application/jason", Encoding.UTF8, JsonRequestBehavior.AllowGet);
		}

		public ServerController(IDataRepository dataRepository, 
								IFileRepository fileRepository,
								IJsonDataParser jsonDataParser)
		{
			_dataRepository = dataRepository;
			_fileRepository = fileRepository;
			_jsonDataParser = jsonDataParser;
		}

		public ActionResult ServerSuccess()
		{
			return View();
		}

		public ActionResult ServerFailure(string errorMessage)
		{
			ErrorViewModel error = new ErrorViewModel(errorMessage);
			return View(error);
		}

		[HttpGet]
		[ValidateInput(false)]
		public JsonResult CreateProduct()
		{
			return ToJson(new Product());
		}

		[HttpPost]
		[ValidateInput(false)]
		public ActionResult SaveProduct(string formParamName)
		{
			try
			{
				string conceptString = Request.Form[formParamName];
				string serializaedObject = HttpUtility.HtmlDecode(conceptString);
				Product product = _jsonDataParser.Deserialize<Product>(serializaedObject);
				if (product.Name.Equals("cat"))
				{
					return RedirectToAction("ServerFailure", "Server", new { errorMessage = "That's a pet!" });
				}
				if ((product.ProductVideo.Value.FileKey != null)
					&& (Request.Files.AllKeys.Contains(product.ProductVideo.Value.FileKey)))
				{
					var pictureStream = Request.Files[product.ProductVideo.Value.FileKey].InputStream;
					var fileId = _fileRepository.SaveFile(GetStreamBytes(pictureStream), product.ProductVideo.Value.CurrentContentType);
					product.ProductVideo.Value.FileName = GetFileUrl(fileId);
				}
				if (product.Pictures != null)
				{
					var numPictures = 0;
					foreach (var picture in product.Pictures.Files)
					{
						if (!Request.Files.AllKeys.Contains(picture.FileKey))
							continue;
						if (++numPictures > 3)
							throw new AppException("Too many files in a single instance. Maximum is 3.");
						var stream = Request.Files[picture.FileKey].InputStream;
						var fileId = _fileRepository.SaveFile(GetStreamBytes(stream), picture.CurrentContentType);
						picture.FileId = fileId.ToString();
						picture.FileName = GetFileUrl(fileId);
					}
				}
				_dataRepository.SaveProduct(product);

				return RedirectToAction("ServerSuccess");
			}
			catch (AppException appException)
			{
				return RedirectToAction("ServerFailure", "Server", new { errorMessage = appException.Message });
			}
			catch (Exception)
			{
				return RedirectToAction("ServerFailure", "Server", new { errorMessage = "Internal server error." });
			}
		}

		private string GetFileUrl(Guid fileId)
		{
			return Url.Action("GetFile", "File", new {fileId = fileId});
		}

		private static byte[] GetStreamBytes(Stream reader)
		{
			const int bufferLength = 1024;
			byte[] buffer = new byte[1024];
			using (MemoryStream memoryStream = new MemoryStream())
			{
				using (reader)
				{
					int bytesRead;
					while ((bytesRead = reader.Read(buffer, 0, bufferLength)) > 0)
					{
						memoryStream.Write(buffer, 0, bytesRead);
						if (memoryStream.Length > 6*1024*1024)
							throw new AppException("File too large. 6M maximum.");
					}
					reader.Close();
				}
				return memoryStream.ToArray();
			}
		}

		[HttpGet]
		[ValidateInput(false)]
		public JsonResult ListProduct()
		{
			var products = _dataRepository.GetProducts();
			return ToJson(products);
		}

		[HttpPost]
		[ValidateInput(false)]
		public JsonResult DeleteProduct()
		{
			var content = GetStreamBytes(Request.InputStream);
			var contentText = System.Text.Encoding.UTF8.GetString(content);
			var request = _jsonDataParser.Deserialize<DeleteProductRequest>(contentText);
			_dataRepository.DeleteProduct(request.ProductId);

			return ToJson(new SuccessResponse());
		}

		[HttpGet]
		[ValidateInput(false)]
		public JsonResult CreateContact()
		{
			return ToJson(new Contact());
		}

		[HttpPost]
		[ValidateInput(false)]
		public JsonResult SaveContact()
		{
			var content = GetStreamBytes(Request.InputStream);
			var contentText = System.Text.Encoding.UTF8.GetString(content);

			Contact contact = _jsonDataParser.Deserialize<Contact>(contentText);
			_dataRepository.SaveContact(contact);

			return ToJson(new SuccessResponse());
		}

		[HttpGet]
		[ValidateInput(false)]
		public JsonResult ListContact()
		{
			var contacts = _dataRepository.GetContacts();
			return ToJson(contacts);
		}


		[HttpPost]
		[ValidateInput(false)]
		public JsonResult DeleteContact(string formParamName)
		{
			var content = GetStreamBytes(Request.InputStream);
			var contentText = System.Text.Encoding.UTF8.GetString(content);
			var request = _jsonDataParser.Deserialize<DeleteContactRequest>(contentText);
			_dataRepository.DeleteContact(request.ContactId);

			return ToJson(new SuccessResponse());
		}
    }
}
