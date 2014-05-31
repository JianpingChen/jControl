define(['./product',
		'../../myControls'],
function (product, j)
{
	function productList(productListJson)
	{
		var inner = {};
		inner.createModel = function (childDto, modelFactory)
		{
			return product.create(childDto);
		};

		var outer = j.collectionModelBase(productListJson, inner);
		return outer;
	};

	return { create: productList };
});