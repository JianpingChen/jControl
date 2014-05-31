using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using MvcAppExample.Contracts;

namespace MvcAppExample.Controllers
{
	public class ContactController : ApiController
	{
		private readonly IDataRepository _dataRepository;
		private readonly IJsonDataParser _jsonDataParser;

		public ContactController(IDataRepository dataRepository, IJsonDataParser jsonDataParser)
		{
			_dataRepository = dataRepository;
			_jsonDataParser = jsonDataParser;
		}

		public IEnumerable<Contact> Get()
		{
			return _dataRepository.GetContacts();
		}

		public Contact Get(int id)
		{
			return _dataRepository.GetContact(id);
		}

		public Contact Post([FromBody]Contact contact)
		{
			_dataRepository.AddContact(contact);
			return contact;
		}

		public Contact Put(int id, [FromBody]Contact contact)
		{
			_dataRepository.UpdateContact(id, contact);
			return contact;
		}

		public Contact Delete(int id)
		{
			Contact contact = _dataRepository.GetContact(id);
			_dataRepository.DeleteContact(id);
			return contact;
		}
	}
}
