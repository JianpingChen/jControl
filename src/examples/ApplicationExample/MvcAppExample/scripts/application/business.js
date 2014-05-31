define(['../myControls',
		'./controllers/salesRepController'],
function (j, salesRepController)
{
	function business()
	{
		var a = ApplicationStrings;
		var inner = {};
		inner.buttonRow = j.div('businessView.buttonRow');
		inner.contentRow = j.div('businessView.contentRow')
								.addClass('businessView-contentRow');

		inner.onShowAbout = function ()
		{
			inner.contentRow.clear();
			var aboutUrl = '/Home/About';
			if (applicationSetting['language'] == 'fr')
				aboutUrl = '/Home/AboutFr';
			var aboutContent = j.iframe();
			aboutContent.setUrl(aboutUrl)
						.fullWidth()
						.fullHeight();
			inner.contentRow.add(aboutContent);
		};
		inner.showAboutCommand = j.command(inner.onShowAbout);

		inner.onShowSales = function ()
		{
			inner.contentRow.clear();
			inner.contentRow.add(salesRepController.create().render());
		};
		inner.showSalesCommand = j.command(inner.onShowSales);

		var aboutHeader = j.divButton('business.aboutHeader')
								.add(j.spanText(a['label_about']))
								.addClass('navigationButton');

		j.bindButtonCommand(aboutHeader, inner.showAboutCommand);

		var salesHeader = j.divButton('business.salesHeader')
							.add(j.textBlock(a['label_sales']))
							.addClass('navigationButton');

		j.bindButtonCommand(salesHeader, inner.showSalesCommand);

		inner.buttonRow.add(aboutHeader)
						.add(salesHeader);

		var outer = j.div('businessView');
		outer.addClass('business')
			.add(inner.buttonRow)
			.add(inner.contentRow);
		inner.onShowAbout();

		return outer;
	};

	return { create: business };
});