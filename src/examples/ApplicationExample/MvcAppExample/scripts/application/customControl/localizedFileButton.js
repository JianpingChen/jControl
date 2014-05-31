define(['../../myControls'],
function (j)
{
	function localizedFileButton(parentView)
	{
		var a = ApplicationStrings;

		var outer = j.fileBrowseButton();
		outer.add(j.textBlock(a['label_browse']));

		return outer;
	};

	return { create: localizedFileButton };
});