define(['../lib/elements/div'],
function (div)
{

	function layout()
	{
		var inner = {};
		inner.personlizeRow = div.create('layout.personlizeRow');
		inner.personlizeRow.addClass('layout-personlizeRow');

		inner.businessRow = div.create('layout.businessRow');
		inner.businessRow.addClass('layout-businessRow');

		var outer = div.create('layout');

		outer.add(inner.personlizeRow)
			.add(inner.businessRow)
			.addClass('layout');

		outer.getPersonalizeRegion = function ()
		{
			return inner.personlizeRow;
		};

		outer.getBusinessRegion = function ()
		{
			return inner.businessRow;
		};

		return outer;
	};

	return { create: layout };
});