define(['../businessLogic/salesRepAgent',
		'../../myControls',
		'../customControl/localizedFileButton',
		'../errorHandling/errorEventArg',
		'../abstractViews/productEditAbstractView',
		'../concreteViews/editProductView'],
function (salesRepAgent,
			j,
			localizedFileButton,
			errorEventArg,
			productEditAbstractView,
			editProductView)
{

	function editProductController(doneWithWorkAreaEvent, errorEvent)
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.agent = salesRepAgent.create();
		inner.doneEvent = doneWithWorkAreaEvent;
		inner.errorEvent = errorEvent;

		inner.onModelSaved = function (sender, model)
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onModelSaved);
			inner.doneEvent.raiseEvent(outer);
		};

		inner.onCancel = function ()
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onModelSaved);
			inner.doneEvent.raiseEvent(outer);
		};

		var outer = {};

		inner.renderEditView = function ()
		{
			inner.editView = editProductView.create();
			return inner.editView;
		};

		inner.bindProductEditDetails = function (productModel)
		{
			inner.abstractView = productEditAbstractView.create(productModel, inner.agent, inner.errorEvent);
			inner.abstractView.modelSavedEvent.subscribe(inner.onModelSaved);

			j.bindButtonCommand(inner.editView.getSaveButton(), inner.abstractView.saveCommand);
			j.bindButtonCommand(inner.editView.getCancelButton(), j.command(inner.onCancel));

			j.bindProperty(inner.editView.getNameEdit(), inner.abstractView, 'Name');
			j.bindProperty(inner.editView.getPriceSpinner(), inner.abstractView, 'Price');
			j.bindProperty(inner.editView.getProductTypeRadios(), inner.abstractView, 'ProductType');
			j.bindFileProperty(inner.editView.getVideoEdit(), inner.abstractView, 'ProductVideo');
			//j.bindFileUpload(inner.editView.getPicturesEdit(), inner.abstractView.productPicturesAccessor);

			var progressHandler = {};
			progressHandler.onSaveProgress = function (sender, progress)
			{
			};

			inner.abstractView.modelSaveProgess.subscribe(progressHandler.onSaveProgress);
		}


		outer.getBusinessAgent = function ()
		{
			return inner.agent;
		};

		outer.createNewProduct = function ()
		{
			inner.agent.createNewProduct(inner.bindProductEditDetails);
			return inner.renderEditView();
		}

		outer.editProduct = function (productModel)
		{
			var editView = inner.renderEditView();
			inner.bindProductEditDetails(productModel);
			return editView;
		};

		return outer;
	};

	return { create: editProductController };

});