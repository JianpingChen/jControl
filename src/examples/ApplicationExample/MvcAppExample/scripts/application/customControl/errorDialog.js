define(['../../myControls'],
function (j)
{
	function errorDialog(parent, errorMessage, dismissCallback)
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.dismissCallback = dismissCallback;

		var outer = j.modalDialog(parent);

		inner.onOk = function ()
		{
			if (typeof (inner.dismissCallback) == 'function')
				inner.dismissCallback();
		};

		outer.getButtonRow().addClass('errorDialog-buttonRow');
		var buttonRow = outer.getButtonRowContent();
		buttonRow.getCancelButton()
				.toggleVisible(false);

		outer.setTitleContent(j.spanText(a['label_errorTitle']))
			.add(j.textBlock(errorMessage))
			.addClass('errorDialog');

		outer.okCommand = j.command(inner.onOk);

		inner.baseShow = outer.show;
		outer.show = function ()
		{
			inner.baseShow("shake", { direction: "right", distance: 45, times: 3 });
			return outer;
		};

		return outer;
	};

	return { create: errorDialog };
});