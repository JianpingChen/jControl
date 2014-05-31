using System;
using System.Collections.Generic;
using System.Linq;
using MvcAppExample.Contracts;
using MvcAppExample.ErrorHandling;

namespace MvcAppExample.Controllers
{
	public class DataRepository : IDataRepository
	{
		private const int MaxItems = 50;
		private readonly IFileRepository _fileRepository;
		private int _productIdSequence;
		private int _contactIdSequence;

		private Dictionary<int, Product> _products;
		private Dictionary<int, Contact> _contacts;

		public DataRepository(IFileRepository fileRepository)
		{
			_fileRepository = fileRepository;
			PopulateMockProducts();
			PopulateMockContacts();
		}

		private void PopulateMockContacts()
		{
			_contactIdSequence = 10;
			_contacts = new Dictionary<int, Contact>()
							{
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Mary Ann", Gender = Gender.Female, Email = "mary.ann@vd.com"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "John Smith", Gender = Gender.Male, Email = "john.smith@gmail.com"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Bob McCain", Gender = Gender.Male, Email = "bob.mccain@yahoo.com"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Kevin Peacock", Gender = Gender.Unkown, Email = "kevin.peacock@twitter.com"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Nancy Johnson", Gender = Gender.Unkown, Email = "nancy.johnson@facebook.com"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Bill Johns", Gender = Gender.Male, Email = "bill.johns@shaw.ca"}},
								{_contactIdSequence, new Contact() {Id = _contactIdSequence++, Name = "Susan Miller", Gender = Gender.Female, Email = "susan.miller@aol.usa"}},
							};
		}

		private void PopulateMockProducts()
		{
			_productIdSequence = 10;
			_products = new Dictionary<int, Product>()
							{
								{_productIdSequence, new Product {Id = _productIdSequence++, Name = "BMW X5", ProductType =ProductType.Suv }},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Lexus RX 350", ProductType = ProductType.Suv}},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Toyota Corolla", ProductType = ProductType.FamilyCar}},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Ford Taurus", ProductType = ProductType.FamilyCar}},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Volkswagen Touareg", ProductType = ProductType.Suv}},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Chevrolet Camaro", ProductType = ProductType.RaceCar}},
								{_productIdSequence, new Product() {Id = _productIdSequence++, Name = "Nissan Infiniti M37x", ProductType = ProductType.RaceCar}},
							};
		}

		#region Implementation of IDataRepository

		public void SaveProduct(Product product)
		{
			if (product.Id <= 0)
			{
				product.Id = _productIdSequence++;
			}
			lock(_products)
			{
				if (_products.Count > MaxItems)
					throw new AppException("Too many products. Please delete some.");
				_products[product.Id] = product;
			}
		}

		public IList<Product> GetProducts()
		{
			lock(_products)
			{
				return _products.Values.ToList();
			}
		}

		public void SaveContact(Contact contact)
		{
			if (contact.Id <= 0)
			{
				contact.Id = _contactIdSequence++;
			}
			lock (_contacts)
			{
				if (_contacts.Count > MaxItems)
					throw new AppException("Too many contacts. Please delete some.");
				_contacts[contact.Id] = contact;
			}
		}

		public IList<Contact> GetContacts()
		{
			lock (_contacts)
			{
				return _contacts.Values.ToList();
			}
		}

		public void DeleteProduct(int productId)
		{
			lock(_products)
			{
				if (productId == 10)
				{
					// error handling test
					throw new AppException("You cannot delete MY car!");
				}
				if (_products.ContainsKey(productId))
				{
					var product = _products[productId];
					if (!string.IsNullOrEmpty(product.ProductVideo.Value.FileId))
					{
						Guid fileId;
						if (Guid.TryParse(product.ProductVideo.Value.FileId, out fileId))
						{
							_fileRepository.DeleteFile(fileId);
						}
					}
					foreach (var picture in product.Pictures.Files)
					{
						if (!string.IsNullOrEmpty(picture.FileId))
						{
							Guid fileId;
							if (Guid.TryParse(picture.FileId, out fileId))
							{
								_fileRepository.DeleteFile(fileId);
							}
						}
					}
					_products.Remove(productId);
				}
			}
		}

		public void DeleteContact(int contactId)
		{
			lock (_contacts)
			{
				if (contactId == 10)
				{
					// error handling test
					throw new AppException("She's a good lady!");
				}
				if (_contacts.ContainsKey(contactId))
				{
					_contacts.Remove(contactId);
				}
			}
		}

		public Contact GetContact(int contactId)
		{
			return _contacts[contactId];
		}

		public void AddContact(Contact contact)
		{
			SaveContact(contact);
		}

		public void UpdateContact(int contactId, Contact contact)
		{
			var existing = GetContact(contactId);
			existing.UpdateFrom(contact);
		}

		#endregion
	}
}