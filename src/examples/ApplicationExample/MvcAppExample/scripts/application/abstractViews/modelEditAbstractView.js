define(['../../myControls',
		'../errorHandling/errorEventArg'],
function (j, errorEventArg)
{
	function modelEditAbstractView(shared, errorEvent)
	{
		var inner = shared;
		inner.errorEvent = errorEvent;

		inner.raiseError = function (errorArg)
		{
			inner.errorEvent.raiseEvent(outer, errorArg);
		};

		inner.onSaveFailed = function (errorCode, errorMessage)
		{
			var errorArg = errorEventArg.create(errorMessage);
			inner.raiseError(errorArg);
		};

		inner.canSave = function ()
		{
			return inner.model.validate();
		};

		inner.saveCommand = j.command(inner.saveModel, inner.canSave);
		inner.onModelChanged = function (sender, arg)
		{
			inner.saveCommand.raiseEvent();
		};

		var outer = {};

		return outer;
	};

	return { create: modelEditAbstractView };
});