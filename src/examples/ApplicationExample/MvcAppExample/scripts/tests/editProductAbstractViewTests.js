require(['../myControls',
		'../application/models/product',
		'./mockEmptyProduct',
		'../application/abstractViews/productEditAbstractView',
		'../lib/testingTools/mockEventListener',
		'../lib/testingTools/mockErrorHandler'],
function (j, product, mockEmptyProduct, productEditAbstractView, mockEventListener, mockErrorHandler)
{
	QUnit.config.reorder = false;

	var emptyProductJson = mockEmptyProduct.create();

	var emptyProduct = product.create(emptyProductJson);
	var mockSalesRepAgent = {};
	mockSalesRepAgent.saveCalled = false;
	mockSalesRepAgent.saveProduct = function (model, fileUploadForm, onSaveSucceeded, onSaveFailed)
	{
		onSaveSucceeded();
		mockSalesRepAgent.saveCalled = true;
	};
	var mockErrorEvent = j.customEvent();
	var abstractView = productEditAbstractView.create(emptyProduct, mockSalesRepAgent, mockErrorEvent);
	var savedEventListener = mockEventListener.create();
	var errorEventListener = mockEventListener.create();
	mockErrorEvent.subscribe(errorEventListener.callback);

	test('productEditAbstractView should have saveCommand, it is disabled for empty product', function ()
	{
		ok(abstractView.saveCommand != null);
		ok(!abstractView.saveCommand.canExecute(emptyProduct));
	});

	test('productEditAbstractView should have modelSavedEvent', function ()
	{
		ok(abstractView.modelSavedEvent != null);
		abstractView.modelSavedEvent.subscribe(savedEventListener.callback);
	});

	test('productEditAbstractView should enable saveCommand when name, price, and productType are set to valid values', function ()
	{
		abstractView.setPropertyValue('Name', 'TV');
		abstractView.setPropertyValue('Price', 12);
		abstractView.setPropertyValue('ProductType', 1);
		ok(abstractView.saveCommand.canExecute(emptyProduct));
	});

	test('productEditAbstractView should call salesRepAgent saveProduct and raise modelSaved event when succeeded', function ()
	{
		abstractView.saveCommand.execute(emptyProduct);
		ok(mockSalesRepAgent.saveCalled);
		ok(savedEventListener.callbackInvoked);
	});

	test('productEditAbstractView should call salesRepAgent saveProduct and raise error event when failed', function ()
	{
		mockSalesRepAgent.saveProduct = function (model, fileUploadForm, onSaveSucceeded, onSaveFailed)
		{
			onSaveFailed();
			mockSalesRepAgent.saveCalled = true;
		};
		abstractView.saveCommand.execute(emptyProduct);
		ok(mockSalesRepAgent.saveCalled);
		ok(errorEventListener.callbackInvoked);
	});

});