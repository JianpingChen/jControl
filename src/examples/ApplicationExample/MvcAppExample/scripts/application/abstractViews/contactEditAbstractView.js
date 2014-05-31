define(['../../myControls',
		'./modelEditAbstractView'],
function (j, modelEditAbstractView)
{
	function contactEditAbstractView(contactModel, salesRepAgent, errorEvent)
	{
		var inner = {};
		inner.agent = salesRepAgent;
		inner.model = contactModel;

		inner.onSaveSucceeded = function ()
		{
			outer.modelSavedEvent.raiseEvent(outer, inner.model);
		};

		inner.saveModel = function ()
		{
			inner.agent.saveContact(inner.model, inner.onSaveSucceeded, inner.onSaveFailed);
		};

		var outer = contactModel;
		modelEditAbstractView.create(inner, errorEvent);
		outer.subscribeToModelChange(inner.onModelChanged);

		outer.saveCommand = inner.saveCommand;

		outer.modelSavedEvent = j.customEvent();

		return outer;
	};

	return { create: contactEditAbstractView };
});