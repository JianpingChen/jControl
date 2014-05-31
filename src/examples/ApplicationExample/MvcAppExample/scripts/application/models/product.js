define(['../../myControls'],
function (j)
{
	function product(productJson)
	{
		var inner = {};
		inner.dto = productJson;
		inner.videoKey = 'productVideo';
		inner.modelFactory = j.fileHandlingModelFactory();
		inner.modelFactory.baseCreateModel = inner.modelFactory.createModel;
		inner.modelFactory.createModel = function (modelDto, overrideFactory)
		{
			if (modelDto["__type"] == 'Product')
				return product(modelDto);
			return inner.modelFactory.baseCreateModel(modelDto);
		};

		var outer = j.modelFactory().createModel(inner.dto, inner.modelFactory);

		outer.getLocalizedLabel = function (field)
		{
			return field;
		};

		inner.baseSetPropertyValue = outer.setPropertyValue;
		outer.setPropertyValue = function (propertyName, value)
		{
			inner.baseSetPropertyValue(propertyName, value);
			if (propertyName == 'Name')
				inner.validateName();
			else if (propertyName == 'Price')
				inner.validatePrice();
		};

		inner.validateName = function ()
		{
			if (!inner.isNameValid())
				outer.raisePropertyError('Name', ApplicationStrings['error_productNameNotEmpty']);
			else
				outer.dismissPropertyError('Name');
		};

		inner.validatePrice = function ()
		{
			if (!inner.isPriceValid())
				outer.raisePropertyError('Price', 'Price must be greater than 0');
			else
				outer.dismissPropertyError('Price');
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

		inner.isPriceValid = function ()
		{
			var price = outer.getPropertyValue('Price');
			return (price > 0);
		};

		inner.isProductTypeValid = function ()
		{
			var productType = outer.getPropertyValue('ProductType');
			return (productType >= 0) && (productType <= 2);
		};

		outer.validate = function ()
		{
			if (!inner.isNameValid())
				return false;
			if (!inner.isPriceValid())
				return false;
			if (!inner.isProductTypeValid())
				return false;
			// TODO: check picture path
			return true; // inner.files == null || inner.files.length > 0;
		};

		outer.getId = function ()
		{
			return inner.dto['Id'];
		};

		return outer;
	};

	return { create: product };
});