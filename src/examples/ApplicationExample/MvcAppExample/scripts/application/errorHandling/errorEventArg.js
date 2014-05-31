define(
function ()
{
	function errorEventArg(message, dismissCallback)
	{
		var outer = {};
		outer.errorMessage = '';
		if (message != null)
		{
			outer.errorMessage = message;
		}
		outer.dismissCallback = function () { };
		if (typeof (dismissCallback) == 'function')
		{
			outer.dismissCallback = dismissCallback;
		}
		return outer;
	};

	return { create: errorEventArg };
});