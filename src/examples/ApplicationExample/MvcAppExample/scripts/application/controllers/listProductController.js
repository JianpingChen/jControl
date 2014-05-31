define(['../businessLogic/salesRepAgent',
		'../../myControls',
		'../errorHandling/errorEventArg',
		'./editProductDialogController'],
function (salesRepAgent, j, errorEventArg, editProductDialogController)
{
	function listProductController(doneWithWorkAreaEvent, errorEvent)
	{
		var a = ApplicationStrings;
		var inner = {};
		inner.agent = salesRepAgent.create();
		inner.doneEvent = doneWithWorkAreaEvent;
		inner.errorEvent = errorEvent;
		inner.view = j.div('listProductController.view').addClass('listProductController-view');

		var outer = {};

		inner.onGetProductListFailed = function (errorMessage)
		{
			inner.errorEvent.raiseEvent(outer, errorEventArg.create(errorMessage));
			inner.doneEvent.raiseEvent(outer);
		};

		inner.onEditProduct = function (product)
		{
			var dialog = editProductDialogController.create(inner.agent, inner.errorEvent);
			dialog.edit(product, inner.view);
		};

		inner.onProductAdded = function (product)
		{
			inner.tbl.addRow(inner.renderProductRow(product));
		};

		inner.onProductRemoved = function (product)
		{
			inner.tbl.removeRowByData(product);
		};

		inner.onProductsCleared = function (collection)
		{
			inner.tbl.clearRows();
		};

		inner.onModelListChanged = function (sender, collectionChange)
		{
			switch (collectionChange.change)
			{
				case sender.change.add:
					inner.onProductAdded(collectionChange.item);
					break;
				case sender.change.remove:
					inner.onProductRemoved(collectionChange.item);
					break;
				case sender.change.clear:
					inner.onProductsCleared(collectionChange.item);
					break;
			}
		};

		inner.onDeleteSucceeded = function (product)
		{
			inner.productListModel.remove(product);

			inner.tbl.removeRowByData(product);
		};

		inner.onDeleteFailed = function (returnCode, errorMessage)
		{
			inner.errorEvent.raiseEvent(outer, errorEventArg.create(errorMessage));
		};

		inner.onDeleteProduct = function (product)
		{
			inner.agent.deleteProduct(product, inner.onDeleteSucceeded, inner.onDeleteFailed);
		};

		inner.renderTableHeaders = function (tbl)
		{
			tbl.addColumn('') // for edit button
				.addColumn(a['lable_productName'])
				.addColumn(''); // for delete button
		};

		inner.renderProductRow = function (product)
		{
			var row = j.tr();
			var editProductButton = j.button();
			editProductButton.attachData(product)
								.addClass('edit-model-button');
			j.bindButtonCommand(editProductButton, j.command(inner.onEditProduct));

			var deleteProductButton = j.button();
			deleteProductButton.attachData(product)
					.addClass('delet-model-button');
			j.bindButtonCommand(deleteProductButton, j.command(inner.onDeleteProduct));

			var nameField = j.textBlock(product.getPropertyValue('Name'));

			row.addCell(editProductButton)
				.addCell(nameField)
				.addCell(deleteProductButton)
				.attachData(product);
			return row;
		};

		inner.onProductListReturned = function (productListModel)
		{
			inner.productListModel = productListModel;
			inner.productListModel.subscribeToModelChange(inner.onModelListChanged);
			inner.view.clear();
			inner.tbl = j.table().addClass('model-list-table product-list-table');
			inner.renderTableHeaders(inner.tbl);
			for (var i = 0; i < productListModel.numOfModels(); i++)
			{
				var product = productListModel.getModel(i);
				inner.tbl.addRow(inner.renderProductRow(product));
			};
			inner.view.add(inner.tbl);
		};


		outer.createProductListView = function ()
		{
			inner.view.clear();
			inner.agent.getProductList(inner.onProductListReturned, inner.onGetProductListFailed);
			return inner.view;
		};

		return outer;
	};

	return { create: listProductController };
});