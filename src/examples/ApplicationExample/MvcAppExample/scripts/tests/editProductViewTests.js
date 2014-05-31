require(['../application/concreteViews/editProductView'],
function (editProductView)
{
	QUnit.config.reorder = false;

	var view = editProductView.create();

	test('editProductView should have class editProductController-editView', function ()
	{
		ok(view.hasClass('editProductController-editView'));
	});

	test('editProductView should have save button and the button should have class dialogButton', function ()
	{
		ok(view.getSaveButton().hasClass('dialogButton'));
	});

	test('editProductView should have cancel button and the button should have class dialogButton', function ()
	{
		ok(view.getCancelButton().hasClass('dialogButton'));
	});

	test('editProductView should have edit control for product name', function ()
	{
		ok(view.getNameEdit() != null);
	});

	test('editProductView should have edit control for product price and it should have class inline-spinner', function ()
	{
		ok(view.getPriceSpinner() != null);
		ok(view.getPriceSpinner().hasClass('inline-spinner'));
	});

	test('editProductView should have edit control for product type', function ()
	{
		ok(view.getProductTypeRadios() != null);
	});

	test('editProductView should have edit control for product video', function ()
	{
		ok(view.getVideoEdit() != null);
	});

	test('editProductView should have edit control for product pictures', function ()
	{
		ok(view.getPicturesEdit() != null);
	});


});