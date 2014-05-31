define(['../customControl/errorDialog',
		'../../lib/observe/customEvent'],
function (errorDialog, errorEvent)
{
	function errorHandler(dialogParent)
	{
		var inner = {};
		inner.errorEvent = errorEvent.create();

		var outer = {};
		outer.getErrorEvent = function ()
		{
			return inner.errorEvent;
		};

		outer.onError = function (sender, eventArg)
		{
			var dialog = errorDialog.create(dialogParent, eventArg.errorMessage, eventArg.dismissCallback);
			dialog.show();
		};
		inner.errorEvent.subscribe(outer.onError);

		return outer;
	};

	return { create: errorHandler };
});