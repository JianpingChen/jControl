define(['../../myControls',
		'./modelEditAbstractView'],
function (j, modelEditAbstractView)
{
	function productEditAbstractView(productModel, salesRepAgent, errorEvent)
	{
		var inner = {};
		inner.agent = salesRepAgent;
		inner.model = productModel;

		inner.saveModel = function (fileUploadForm)
		{
			inner.agent.saveProduct(inner.model, fileUploadForm, inner.onSaveSucceeded, inner.onSaveFailed, inner.onSaveProgress);
		};

		var outer = productModel;
		modelEditAbstractView.create(inner, errorEvent);

		inner.onSaveSucceeded = function ()
		{
			outer.modelSavedEvent.raiseEvent(outer, outer);
		};

		inner.onSaveProgress = function (total, loaded)
		{
			outer.modelSaveProgess.raiseEvent(outer, { total: total, loaded: loaded });
		};

		outer.subscribeToModelChange(inner.onModelChanged);

		outer.saveCommand = inner.saveCommand;

		outer.modelSavedEvent = j.customEvent();
		outer.modelSaveProgess = j.customEvent();

		return outer;
	};

	return { create: productEditAbstractView };

});