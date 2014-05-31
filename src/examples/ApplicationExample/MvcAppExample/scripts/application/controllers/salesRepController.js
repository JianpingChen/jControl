define(['../../myControls',
		'../controllers/editProductController',
		'../controllers/editContactController',
		'../controllers/listProductController',
		'../controllers/listContactController',
		'../errorHandling/errorHandler'],
function (j,
		editProductControl,
		editContactControl,
		listProductControl,
		listContactControl,
		errorHandler)
{
	function salesRepController()
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.workArea = null;
		inner.doneWithWorkArea = j.customEvent();

		inner.initWorkAreaContent = function ()
		{
			var content = j.div('salesRepController.initWorkAreaContent');
			content.add(j.textBlock('sales rep work area'))
					.add(j.img('/images/bigImage.jpg', '', 270, 360))
					.setDisplay('block');
			return content;
		};

		inner.getErrorHandler = function ()
		{
			if (inner.errorHandler == null)
			{
				inner.errorHandler = errorHandler.create(inner.workArea);
			}
			return inner.errorHandler;
		}

		inner.onDoneWithWorkArea = function (sender, eventArg)
		{
			inner.workArea.clear()
						.add(inner.initWorkAreaContent());
		};
		inner.doneWithWorkArea.subscribe(inner.onDoneWithWorkArea);

		inner.createProduct = function ()
		{
			var editProduct = editProductControl.create(inner.doneWithWorkArea, inner.getErrorHandler().getErrorEvent());
			inner.workArea.clear()
						.add(editProduct.createNewProduct());
		};

		inner.createContact = function ()
		{
			var editContact = editContactControl.create(inner.doneWithWorkArea, inner.getErrorHandler().getErrorEvent());
			inner.workArea.clear()
						.add(editContact.createNewContact());
		};

		inner.listProduct = function ()
		{
			var listProductCtrl = listProductControl.create(inner.doneWithWorkArea, inner.getErrorHandler().getErrorEvent());
			inner.workArea.clear()
						.add(listProductCtrl.createProductListView());
		};

		inner.listContact = function ()
		{
			var listContactCtrl = listContactControl.create(inner.doneWithWorkArea, inner.getErrorHandler().getErrorEvent());
			inner.workArea.clear()
						.add(listContactCtrl.createContactListView());
		};

		inner.renderCreateMenu = function ()
		{
			var createMenu = j.div('salesRepController.createMenu');

			var createProduct = j.divButton();
			createProduct.add(j.spanText(a['lable_create']+' '+a['lable_product']));
			j.bindButtonCommand(createProduct, j.command(inner.createProduct));

			var createContact =  j.divButton();
			createContact.add(j.spanText(a['lable_create']+' '+a['lable_contact']));
			j.bindButtonCommand(createContact, j.command(inner.createContact));

			createMenu.add(createProduct)
					.add(createContact)
					.addClass('salesRepController-createMenu');
			return createMenu;
		};

		inner.renderFindMenu = function ()
		{
			var findMenu = j.div('salesRepController.findMenu');

			var findProduct = j.divButton();
			findProduct.add(j.spanText(a['lable_find']+' '+a['lable_product']));
			j.bindButtonCommand(findProduct, j.command(inner.listProduct));

			var findContact = j.divButton();
			findContact.add(j.spanText(a['lable_find']+' '+a['lable_contact']));
			j.bindButtonCommand(findContact, j.command(inner.listContact));

			findMenu.add(findProduct)
					.add(findContact);
			return findMenu;
		};

		var outer = {};

		outer.render = function ()
		{
			var content = j.div('salesRepController.content');
			content.addClass('salesRepController-content');

			var menuPanel = j.div('salesRepController.navigationPanel');
			menuPanel.addClass('salesRepController-navigationPanel');

			var commonTasksMenu = j.div('salesRepController.commonTasksMenu');
			var create = inner.renderCreateMenu();
			var find = inner.renderFindMenu();
			commonTasksMenu.add(create)
							.add(find);

			var menuContent = j.div('salesRepController.menuContent');
			menuContent.add(j.h2(a['lable_commonTasks']))
						.add(commonTasksMenu)
						.paddingAll('4px')
						.addClass('salesRepController-menuContent');
			menuPanel.add(menuContent);

			var workareaPanel = j.div('salesRepController.content.workareaPanel');
			workareaPanel.addClass('salesRepController-content-workareaPanel');
			inner.workArea = workareaPanel;
			inner.workArea.add(inner.initWorkAreaContent());

			content.add(menuPanel)
					.add(inner.workArea);

			return content;
		};

		return outer;
	};

	return { create: salesRepController };

});