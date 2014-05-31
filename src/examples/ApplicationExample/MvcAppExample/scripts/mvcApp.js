require(['./localization/strings',
		'./myControls',
//		'./lib/elements/body',
//		'./lib/elements/canvas',
//		'./lib/elements/size',
		'./application/layout',
		'./application/personalize',
		'./application/business'],
function (s, j,
// body, canvas, size, 
		layout, personalize, business)
{
	var inner = {};
	inner.onStringsLoaded = function ()
	{
		var appContainer = j.containerElement(document.getElementById(applicationSetting.containerId), 'applicationRoot'); // j.body();
		appContainer.onAttachedToDom();

		var title = j.h1(ApplicationStrings['label_applicationTitle']);
		appContainer.add(title);
		// var docBody = body.create();
		//	var c = canvas.create(700, 100).setOuterSize(size.create(700, 100));
		//	docBody.add(c);
		//	try
		//	{
		//		var ctx = c.getHtmlElement().getContext("2d");
		//		ctx.font = "30px Verdana";
		//		ctx.strokeText(ApplicationStrings.label_applicationTitle, 10, 50);
		//	}
		//	catch(e){};
		var layoutLayer = layout.create();
		appContainer.add(layoutLayer);
		layoutLayer.getPersonalizeRegion().add(personalize.create());
		layoutLayer.getBusinessRegion().add(business.create());
	};

	var stringsLoaded = j.customEvent();
	stringsLoaded.subscribe(inner.onStringsLoaded);
	s.create(stringsLoaded);
});
