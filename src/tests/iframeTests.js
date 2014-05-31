/*
This file is part of jControl® JavaScript library, an object oriented JavaScript programming framework.

Copyright (C) 2014 Visual Dynamics Software Ltd.
Trademark jControl® is a registered trademark of Visual Dynamics Software Ltd.

jControl® Open Source is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jControl® Open Source is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with jControl® Open Source.  If not, see <http://opensource.org/licenses/GPL-3.0/>.

Contact information: jp.chen.jianping@gmail.com
*/
require(['../lib/jControl'],
function(j)
{
QUnit.config.reorder = false;

	var body = j.body();
test('iframe should allow set url', function() {
	var i = j.iframe();
	equal(i.getUrl(), '');
	var url = 'samplePage.html';
	i.setUrl(url);
	var fullPath = i.getUrl();
	var sections= fullPath.split('/');
	equal(sections[sections.length-1], url);
});

asyncTest('iframe allow loaded listener', function() {
	var listener = j.mockEventListener();
	var i = j.iframe();
	equal(i.getUrl(), '');
	var url = 'samplePage.html';
	i.setUrl(url);
	i.subscribeToLoad(listener.callback);
	body.add(i);
	setTimeout(function() {
		ok(listener.callbackInvoked);
		start();
		i.unsubscribeLoad(listener.callback);
		ok(i.getDocument() != undefined);
		body.remove(i);
		i.dispose();
	}, 50);
});

// test('iframe should allow set content', function() {
	// var i = j.iframe();
	// var female = j.div('maleSelect');
	// female.add(j.img('./image.gif', '', '20', '20'))
		// .add(j.textBlock('Female'));
	// var outer = female.getOuterHtml();
	// i.setContent(outer);
// });

// Cannot cross domain
// test('iframe should support reload', function() {
	// var i = j.iframe();
	// i.setAttributeValue('sandbox', '');
	// i.setUrl('samplePage.html');
	// var fullPath = i.getUrl();
	// i.setUrl(fullPath);
	// body.add(i);
	// equal(body.numberOfChildren(), 1);
	// i.reload();
	// // body.remove(i);
	// // i.dispose();
// });

});
