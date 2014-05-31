define(['../myControls'],
function (j)
{
	var a = ApplicationStrings;
	var docBody = j.body();
	var content = j.div();
	content.add(j.h1(a['label_aboutTitle']))
			.add(j.p(a['label_aboutP1']));

	docBody.add(content);
});