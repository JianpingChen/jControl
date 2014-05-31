define(['../../myControls',
		'./systemConstants'],
function (j, systemConstants)
{
	function contact(contactJson)
	{
		var defaultDto =
		{
			Id: -1,
			Name: '',
			DateOfBirth: new Date(),
			Email: '',
			Gender: 'Unknown'
		};
		var a = ApplicationStrings;
		var inner = {};
		inner.dto = contactJson || defaultDto;
		if (typeof inner.dto['DateOfBirth'] == 'string')
			inner.dto['DateOfBirth'] = j.fixJsonDate(inner.dto['DateOfBirth']);

		var outer = j.modelBase(inner.dto, j.modelFactory());

		outer.getLocalizedLabel = function (field)
		{
			return a['colHead_' + field];
		};

		outer.clone = function ()
		{
			var serialized = JSON.stringify(inner.dto);
			var dtoClone = JSON.parse(serialized);
			dtoClone["DateOfBirth"] = j.fixJsonDate(inner.dto['DateOfBirth']);
			return contact(dtoClone);
		};

		inner.baseGetLocalizedValue = outer.getLocalizedValue;
		outer.getLocalizedValue = function (name)
		{
			var propName = 'Gender';
			if (name != propName)
				return inner.baseGetLocalizedValue(name);
			switch (inner.dto[propName])
			{
				case 0: return a['label_genderUnknown'];
				case 1: return a['label_genderMale'];
				case 2: return a['label_genderFemale'];
				default: return a['label_genderUnknown'];
			}
		};

		inner.validateName = function ()
		{
			var propName = 'Name';
			var name = outer.getPropertyValue(propName);
			var trimmed = name.trim();
			if (name.length != trimmed.length)
				outer.setPropertyValue(propName, trimmed);
			if (trimmed == 0)
				outer.raisePropertyError(propName, a['error_contactNameNotEmpty']);
			else
				outer.dismissPropertyError(propName);
		};

		inner.validateEmail = function ()
		{
			var propName = 'Email';
			if (!inner.isEmailValid())
				outer.raisePropertyError(propName, a['error_mustBeValidEmail']);
			else
				outer.dismissPropertyError(propName);
		};

		inner.baseSetValue = outer.setPropertyValue;
		outer.setPropertyValue = function (name, val)
		{
			inner.baseSetValue(name, val);
			if (name == 'Name')
				inner.validateName();
			if (name == 'Email')
				inner.validateEmail();
			return outer;
		};

		inner.isNameValid = function ()
		{
			var name = outer.getPropertyValue('Name');
			if (name == null)
				return false;
			var trimmed = name.trim();
			if (trimmed.length == 0)
				return false;
			return true;
		};

		inner.isEmailValid = function ()
		{
			var email = outer.getPropertyValue('Email');
			return email.match(systemConstants['emailRegex']);
		};

		inner.isGenderValid = function ()
		{
			var gender = outer.getPropertyValue('Gender');
			return (gender >= 0) && (gender <= 2);
		};

		outer.validate = function ()
		{
			if (!inner.isNameValid())
				return false;

			if (!inner.isEmailValid())
				return false;

			if (!inner.isGenderValid())
				return false;
			return true;
		};

		outer.getId = function ()
		{
			return inner.dto['Id'];
		};

		outer.getData = function ()
		{
			return inner.dto;
		};

		return outer;
	};

	return { create: contact };
});