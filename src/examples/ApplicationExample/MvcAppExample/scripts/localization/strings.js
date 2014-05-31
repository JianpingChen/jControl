define(function ()
{
	var localizedStrings;

	var inner = {};
	inner.loadByLanguage = function ()
	{
		require(['./localization/' + applicationSetting.language + '/Application'], function (l)
		{
			localizedStrings = l;
			inner.loadedEvent.raiseEvent();
		});
	}

	function load(onLoadedEvent)
	{
		if (localizedStrings != null)
			return localizedStrings;
		inner.loadedEvent = onLoadedEvent;
		inner.loadByLanguage();
		return localizedStrings;
	};

	return { create: load };
});