using System.Collections.Generic;
using MvcAppExample.Contracts;

namespace MvcAppExample.Controllers
{
	public interface IDataRepository
	{
		void SaveProduct(Product product);
		IList<Product> GetProducts();
		void SaveContact(Contact contact);
		IList<Contact> GetContacts();
		void DeleteProduct(int productId);
		void DeleteContact(int contactId);
		Contact GetContact(int contactId);
		void AddContact(Contact contact);
		void UpdateContact(int contactId, Contact contact);
	}
}