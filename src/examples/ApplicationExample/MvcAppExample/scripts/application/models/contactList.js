define(['./contact',
		'../../myControls'],
function (contact, j)
{
	function contactList(contactListJson)
	{
		var inner = {};
		inner.createModel = function (childDto, modelFactory)
		{
			return contact.create(childDto, modelFactory);
		};

		var outer = j.collectionModelBase(contactListJson, inner);
		return outer;

		return outer;
	};

	return { create: contactList };
});