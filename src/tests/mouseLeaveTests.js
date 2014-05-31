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
	var outerElement = j.div('testDiv').setMinWidth('50')
							.setMinHeight('50')
							.paddingAll('8px')
							.setBackgroundColor('grey');
	var innerElement = j.div('testDiv')
							.paddingAll('8px')
							.setBackgroundColor('green');
	outerElement.add(innerElement);
	var textBlock = j.textBlock('Text Block');
	innerElement.add(textBlock);
	var body = j.body().add(outerElement);
	var outerHtmlElement = outerElement.getHtmlElement();
	var simulator = j.mouseEventSimulator();
	var mouseHandler = j.mockMouseHandler();

test('should notify mouse leave when related target is null', function()
{
	var type = 'mouseout';
	var mouseOut = simulator.mouseEvent(type);
	mouseHandler.reset();
	outerElement.attachMouseHandler(mouseHandler);
	simulator.dispatchEvent(outerHtmlElement, mouseOut);
	ok(!mouseHandler.onClickCalled);
	ok(!mouseHandler.onDoubleClickCalled);
	ok(!mouseHandler.onMouseDownCalled);
	ok(!mouseHandler.onMouseMoveCalled);
	ok(!mouseHandler.onMouseEnterCalled);
	ok(mouseHandler.onMouseLeaveCalled);
	ok(mouseHandler.onMouseOutCalled);
	ok(!mouseHandler.onMouseUpCalled);
	outerElement.detachMouseHandler(mouseHandler);
});

test('should NOT notify mouse leave when related target is child', function()
{
	var innerDivPosition = innerElement.getScreenPosition();
	var type = 'mouseout';
	var mouseOut = simulator.mouseEvent(type, innerDivPosition.left+1, innerDivPosition.top, innerDivPosition.left+1, innerDivPosition.top+1, 0, innerElement.getHtmlElement());
	mouseHandler.reset();
	outerElement.attachMouseHandler(mouseHandler);
	simulator.dispatchEvent(outerHtmlElement, mouseOut);
	ok(!mouseHandler.onClickCalled);
	ok(!mouseHandler.onDoubleClickCalled);
	ok(!mouseHandler.onMouseDownCalled);
	ok(!mouseHandler.onMouseMoveCalled);
	ok(!mouseHandler.onMouseEnterCalled);
	ok(!mouseHandler.onMouseLeaveCalled);
	ok(mouseHandler.onMouseOutCalled);
	ok(!mouseHandler.onMouseUpCalled);
	outerElement.detachMouseHandler(mouseHandler);
});

test('should NOT notify mouse leave when related target is grand child', function()
{
	var textBlockPosition = textBlock.getScreenPosition();
	var type = 'mouseout';
	var mouseOut = simulator.mouseEvent(type, textBlockPosition.left+1, textBlockPosition.top, textBlockPosition.left+1, textBlockPosition.top+1, 0, textBlock.getHtmlElement());
	mouseHandler.reset();
	outerElement.attachMouseHandler(mouseHandler);
	simulator.dispatchEvent(outerHtmlElement, mouseOut);
	ok(!mouseHandler.onClickCalled);
	ok(!mouseHandler.onDoubleClickCalled);
	ok(!mouseHandler.onMouseDownCalled);
	ok(!mouseHandler.onMouseMoveCalled);
	ok(!mouseHandler.onMouseEnterCalled);
	ok(!mouseHandler.onMouseLeaveCalled);
	ok(mouseHandler.onMouseOutCalled);
	ok(!mouseHandler.onMouseUpCalled);
	outerElement.detachMouseHandler(mouseHandler);
});

test('should NOT notify mouse leave when related target is text node', function()
{
	var textBlockPosition = textBlock.getScreenPosition();
	var type = 'mouseout';
	var mouseOut = simulator.mouseEvent(type, textBlockPosition.left+1, textBlockPosition.top, textBlockPosition.left+1, textBlockPosition.top+1, 0, textBlock.getTextElement().getHtmlElement());
	mouseHandler.reset();
	outerElement.attachMouseHandler(mouseHandler);
	simulator.dispatchEvent(outerHtmlElement, mouseOut);
	ok(!mouseHandler.onClickCalled);
	ok(!mouseHandler.onDoubleClickCalled);
	ok(!mouseHandler.onMouseDownCalled);
	ok(!mouseHandler.onMouseMoveCalled);
	ok(!mouseHandler.onMouseEnterCalled);
	ok(!mouseHandler.onMouseLeaveCalled);
	ok(mouseHandler.onMouseOutCalled);
	ok(!mouseHandler.onMouseUpCalled);
	outerElement.detachMouseHandler(mouseHandler);
});
	
test('should notify mouse leave when related target is parent', function()
{
	var type = 'mouseout';
	var outerPosition = outerElement.getScreenPosition();
	var type = 'mouseout';
	var mouseOut = simulator.mouseEvent(type, outerPosition.left+1, outerPosition.top, outerPosition.left+1, outerPosition.top+1, 0, outerElement.getHtmlElement().parentNode);
	mouseHandler.reset();
	outerElement.attachMouseHandler(mouseHandler);
	simulator.dispatchEvent(outerHtmlElement, mouseOut);
	ok(!mouseHandler.onClickCalled);
	ok(!mouseHandler.onDoubleClickCalled);
	ok(!mouseHandler.onMouseDownCalled);
	ok(!mouseHandler.onMouseMoveCalled);
	ok(!mouseHandler.onMouseEnterCalled);
	ok(mouseHandler.onMouseLeaveCalled);
	ok(mouseHandler.onMouseOutCalled);
	ok(!mouseHandler.onMouseUpCalled);
	outerElement.detachMouseHandler(mouseHandler);
});
	body.remove(outerElement);
	outerElement.dispose();
});