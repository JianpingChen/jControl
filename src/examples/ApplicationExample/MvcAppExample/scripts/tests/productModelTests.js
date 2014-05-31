require(['../application/models/product',
		'./mockEmptyProduct',
		'../lib/testingTools/mockEventListener',
		'../lib/testingTools/mockErrorHandler'],
function (product, mockEmptyProduct, mockEventListener, mockErrorHandler)
{
	QUnit.config.reorder = false;

	var productJson = mockEmptyProduct.create();

	var emptyProduct = product.create(productJson);
	var valueChangeListener = mockEventListener.create();
	var errorHandler = mockErrorHandler.create();

	emptyProduct.subscribeToError(errorHandler.errorCallback, errorHandler.dismissErrorCallback, 'Name')
						.subscribeToValueChange(valueChangeListener.callback, 'Name');

	test('productModel should be invalid when name is empty', function ()
	{
		ok(!emptyProduct.validate());
	});

	test('productModel should be support Name property', function ()
	{
		var newName = 'newProductName';
		emptyProduct.setPropertyValue('Name', newName);
		equal(productJson.Name, newName);
		ok(valueChangeListener.callbackInvoked);
		equal(valueChangeListener.callbackArg.value, newName);
	});

	test('productModel should be invalid and raise error when name is set to empty', function ()
	{
		emptyProduct.setPropertyValue('Name', '');
		equal(productJson.Name, '');
		ok(!emptyProduct.validate());
		ok(errorHandler.errorCallbackInvoked);
	});

	test('productModel should dismiss error when name is set to non-empty', function ()
	{
		var validName = 'valid name';
		errorHandler.reset();
		emptyProduct.setPropertyValue('Name', validName);
		equal(productJson.Name, validName);
		ok(!errorHandler.errorCallbackInvoked);
		ok(errorHandler.dismissErrorCallbackInvoked);
	});


});