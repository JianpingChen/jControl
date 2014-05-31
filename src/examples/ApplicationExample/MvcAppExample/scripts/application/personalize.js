define(['../myControls'],
function (j)
{

	function personalize()
	{
		var inner = {};
		inner.switchTheme = function (sender, themeValue)
		{
			var doc = j.documentElement();
			var themeLink = doc.getLinkById('themelink'); // $('#themelink')[0];
			themeLink.setAttributeValue('href', '/styles/Themes/' + themeValue + '/' + themeValue + '.css');
		};

		inner.selection = j.select();

		inner.selection.addItem(ApplicationStrings['themeName_summerHawaii'], 'SummerHawaii')
			.addItem(ApplicationStrings['themeName_winterAlaska'], 'WinterAlaska')
			.selectItem(1)
			.subscribeToValueChange(inner.switchTheme);

		var outer = j.div('personalize');

		outer.add(j.spanText(ApplicationStrings['label_selectTheme']).addClass('shortlabel'))
			.add(inner.selection)
			.addClass('personalize');

		return outer;
	};

	return { create: personalize };
});