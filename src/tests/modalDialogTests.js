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
	var m = j.modalDialog(body);
	var titleContent = j.div('testTitle');
	titleContent.add(j.img('./image.gif', '', 16, 16))
				.add(j.textBlock('Dialog Title'));
	m.setTitleContent(titleContent);
	m.add(j.h1('Dialog h1 Content'))
		.add(j.textBlock('Dialog Content'))
		.add(j.h2('Dialog h2 Content'));
//		.add(j.textBlock('Dialog Content'));
	var mouse = j.mouseEventSimulator();
	var mousedown = mouse.mouseEvent('mouseup');
	var click = mouse.mouseEvent('click');

test('modalDialog should have class modalDialog', function(){
	ok(m.hasClass('modalDialog'));
});

test('modalDialog can not ok by default', function(){
	ok(!m.okCommand.canExecute());
});

test('modalDialog can cancel by default', function(){
	ok(m.cancelCommand.canExecute());
});

test('modalDialog show function should make dialog visible and close function should make it invisible', function(){
	m.show();
	ok(m.isVisible());
	m.close();
	ok(!m.isVisible());
});

test('modalDialog background should have class backgroundOverlay', function(){
	m.show();
	var overlay = m.getBackground();
	ok(overlay.hasClass('backgroundOverlay'));
	m.close();
});

test('modalDialog background should have the size of the document', function(){
	m.show();
	var overlay = m.getBackground();
	var overlaySize = overlay.getOuterSize();
	var docSize = j.documentElement().getOuterSize();
	equal(overlaySize.width, docSize.width);
	equal(overlaySize.height, docSize.height);
	m.close();
});

test('mouse up on modalDialog title bar cancel button should close dialog', function(){
	m.show();
	ok(m.isVisible());
	var titleBar = m.getTitleContent();
	var cancelButton = titleBar.getCornerButton();
	mouse.dispatchEvent(cancelButton.getHtmlElement(), mousedown);
	ok(!m.isVisible());
});

test('mouse click on modalDialog button bar cancel button should close dialog', function(){
	m.show();
	ok(m.isVisible());
	var buttons = m.getButtonRowContent();
	var cancelButton = buttons.getCancelButton();
	mouse.dispatchEvent(cancelButton.getHtmlElement(), click);
	ok(!m.isVisible());
});

// test('mouse click on modalDialog title bar then move mouse should move dialog', function(){
	// m.show();
	// ok(m.isVisible());
	// var startPosition = m.getPopupPosition();
	// var titleBar = m.getTitleContent();
	// var initPosition = titleBar.getOffsetPosition();
	// var mousedown = mouse.mouseEvent('mousedown', startPosition.left + 4, startPosition.top + 4, startPosition.left + 4, startPosition.top + 4);
	// var deltaX = 10;
	// var deltaY = 12;
	// var mouseMove = mouse.mouseEvent('mousemove', startPosition.left + deltaX +4 , startPosition.top + deltaY + 4,startPosition.left + deltaX +4 , startPosition.top + deltaY + 4);
	// var mouseUp = mouse.mouseEvent('mouseup');
	// var documentElement = j.documentElement();
	// mouse.dispatchEvent(titleBar.getHtmlElement(), mousedown);
	// mouse.dispatchEvent(documentElement.getHtmlElement(), mouseMove);
	// mouse.dispatchEvent(titleBar.getHtmlElement(), mouseUp);
	// var endPosition = m.getPopupPosition();
	// notEqual(startPosition.top, endPosition.top);
	// notEqual(startPosition.left, endPosition.left);
	// equal(endPosition.left - startPosition.left, deltaX);
	// equal(endPosition.top - startPosition.top, deltaY);
	// m.close();
	// ok(!m.isVisible());
// });

});