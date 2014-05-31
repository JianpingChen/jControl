using System;

namespace MvcAppExample.Contracts
{
	public enum Gender
	{
		Unkown = 0,
		Male,
		Female
	};

	public class Contact
	{
		public Contact()
		{
			Id = -1;
			Name = string.Empty;
			Gender = Gender.Unkown;
			DateOfBirth = DateTime.Now;
			Email = string.Empty;
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		// Dropdown
		public Gender Gender { get; set; }
		// DatePicker
		public DateTime DateOfBirth { get; set; }

		public void UpdateFrom(Contact contact)
		{
			Name = string.IsNullOrEmpty(contact.Name) ? Name : contact.Name;
			Gender = contact.Gender;
			DateOfBirth = contact.DateOfBirth == DateTime.MinValue ? DateOfBirth : contact.DateOfBirth;
			Email = string.IsNullOrEmpty(contact.Email) ? Email : contact.Email;
		}
	}
}