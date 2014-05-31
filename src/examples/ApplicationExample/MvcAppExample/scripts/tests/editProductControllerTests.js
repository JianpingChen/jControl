require(['../myControls',
		'../application/models/product',
		'../application/controllers/editProductController',
		'./mockEmptyProduct',
		'../lib/testingTools/mouseEventSimulator',
		'../lib/testingTools/mockEventListener',
		'../lib/testingTools/mockErrorHandler'],
function (j, product, editProductController, mockEmptyProduct, mouseEventSimulator, mockEventListener, mockErrorHandler)
{
	QUnit.config.reorder = false;

	var emptyProductJson = mockEmptyProduct.create();

	var emptyProduct = product.create(emptyProductJson);
	var doneEvent = j.customEvent();
	var savedEventListener = mockEventListener.create();
	doneEvent.subscribe(savedEventListener.callback);
	var mockErrorEvent = j.customEvent();
	var errorEventListener = mockEventListener.create();
	mockErrorEvent.subscribe(errorEventListener.callback);
	var mouse = mouseEventSimulator.create();

	var controller = editProductController.create(doneEvent, mockErrorEvent);
	var view = controller.editProduct(emptyProduct);

	test('editProductController should create a view containing save button and the button should be disabled for empty model', function ()
	{
		ok(!view.getSaveButton().isEnabled());
	});

	test('editProductController should create a view containing cancel button and the button should be enabled', function ()
	{
		ok(view.getCancelButton().isEnabled());
	});

	test('editProductController should create a view containing edit control for product name, when user change value of this control model name value should be changed', function ()
	{
		var name = 'new product';
		view.getNameEdit().setValue(name);
		equal(emptyProductJson.Name, name);
	});

	test('editProductController should create a view containing edit control for product price, when user change value of this control model price value should be changed', function ()
	{
		var price = 42;
		view.getPriceSpinner().setValue(price);
		equal(emptyProductJson.Price, price);
	});

	test('editProductController should create a view containing edit control for product type, when user change value of this control model product type value should be changed', function ()
	{
		var type = 2;
		view.getProductTypeRadios().setValue(type);
		equal(emptyProductJson.ProductType, type);
	});

	test('save product button should be enabled once name, price, and product type have valid values', function ()
	{
		ok(view.getSaveButton().isEnabled());
	});

	test('mouse click on save button should save the model, when save succeeded done event should be raised', function ()
	{
		var agent = controller.getBusinessAgent();
		agent.saveCalled = false;
		agent.saveProduct = function (model, fileUploadForm, onSaveSucceeded, onSaveFailed)
		{
			onSaveSucceeded();
			agent.saveCalled = true;
		};
		var click = mouse.mouseEvent('click');
		mouse.dispatchEvent(view.getSaveButton().getHtmlElement(), click);
		ok(agent.saveCalled);
		ok(savedEventListener.callbackInvoked);
		ok(!errorEventListener.callbackInvoked);
	});

	test('mouse click on save button should save the model, when save failed, error event should be raised', function ()
	{
		var agent = controller.getBusinessAgent();
		agent.saveCalled = false;
		agent.saveProduct = function (model, fileUploadForm, onSaveSucceeded, onSaveFailed)
		{
			onSaveFailed();
			agent.saveCalled = true;
		};
		var click = mouse.mouseEvent('click');
		savedEventListener.reset();
		errorEventListener.reset();
		mouse.dispatchEvent(view.getSaveButton().getHtmlElement(), click);
		ok(agent.saveCalled);
		ok(!savedEventListener.callbackInvoked);
		ok(errorEventListener.callbackInvoked);
	});

});