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
require(['../lib/jControl',
		'../lib/controls/popupMoveHandler',
		'../lib/controls/windowOverlay'],
function(j, popupMoveHandler, windowOverlay)
{
QUnit.config.reorder = false;

	var background = windowOverlay.create();
	var body = j.body();
	body.add(background);
	var doc = j.documentElement();
	var mockPopup = j.div('testTarget');
	mockPopup.add(j.textBlock('text content'));
	mockPopup.moveToPosition = function(left, top)
	{
		mockPopup.moveCalled = true;
		mockPopup.moveToLeft = left;
		mockPopup.moveToTop = top;
	};
	mockPopup.reset = function()
	{
		mockPopup.moveCalled = false;
		mockPopup.moveToLeft = -1;
		mockPopup.moveToTop = -1;
	};
	var initPosition = j.position(100, 120);
	mockPopup.getPopupPosition = function()
	{
		return initPosition;
	};
	mockPopup.reset();
	var handler = popupMoveHandler.create(background, mockPopup);
	var mouse = j.mouseEventSimulator();
	
test('mouse down on popup, move, then up should call moveToPosition', function(){
	var startPosition = mockPopup.getPopupPosition();
	var mousedown = mouse.mouseEvent('mousedown', startPosition.left + 4, startPosition.top + 4, startPosition.left + 4, startPosition.top + 4);
	var deltaX = 10;
	var deltaY = 12;
	var mouseMove = mouse.mouseEvent('mousemove', startPosition.left + deltaX +4 , startPosition.top + deltaY + 4,startPosition.left + deltaX +4 , startPosition.top + deltaY + 4);
	var mouseUp = mouse.mouseEvent('mouseup');
	var documentElement = j.documentElement();
	mockPopup.reset();
	mouse.dispatchEvent(mockPopup.getHtmlElement(), mousedown);
	mouse.dispatchEvent(documentElement.getHtmlElement(), mouseMove);
	mouse.dispatchEvent(documentElement.getHtmlElement(), mouseUp);
	ok(mockPopup.moveCalled);
	equal(mockPopup.moveToLeft, startPosition.left + deltaX);
	equal(mockPopup.moveToTop, startPosition.top + deltaY);
});

test('mouse down on popup, up, then move should NOT call moveToPosition', function(){
	var startPosition = mockPopup.getPopupPosition();
	var mousedown = mouse.mouseEvent('mousedown', startPosition.left + 4, startPosition.top + 4, startPosition.left + 4, startPosition.top + 4);
	var deltaX = 10;
	var deltaY = 12;
	var mouseMove = mouse.mouseEvent('mousemove', startPosition.left + deltaX +4 , startPosition.top + deltaY + 4,startPosition.left + deltaX +4 , startPosition.top + deltaY + 4);
	var mouseUp = mouse.mouseEvent('mouseup');
	var documentElement = j.documentElement();
	mockPopup.reset();
	mouse.dispatchEvent(mockPopup.getHtmlElement(), mousedown);
	mouse.dispatchEvent(mockPopup.getHtmlElement(), mouseUp);
	mouse.dispatchEvent(documentElement.getHtmlElement(), mouseMove);
	ok(!mockPopup.moveCalled);
	ok(mockPopup.moveToLeft < 0);
	ok(mockPopup.moveToTop < 0);
});

	body.remove(background);
	background.dispose();
});
