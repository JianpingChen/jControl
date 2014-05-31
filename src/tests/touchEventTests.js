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
	var simulator = j.touchEventSimulator();
	var touchHandler = j.mockTouchHandler();
	var innerTouchHandler = j.mockTouchHandler();

test('should notify touch start event when touch start', function()
{
	var type = 'touchstart';
	touchHandler.reset();
	var detached = j.mockTouchHandler();
	outerElement.attachTouchHandler(touchHandler)
		.attachTouchHandler(detached);
	outerElement.detachTouchHandler(detached);
	var touchStart = simulator.touchEvent(type);
	simulator.dispatchEvent(outerHtmlElement, touchStart);
	ok(touchHandler.onStartCalled);
	ok(!touchHandler.onEnterCalled);
	ok(!touchHandler.onMoveCalled);
	ok(!touchHandler.onLeaveCalled);
	ok(!touchHandler.onEndCalled);
	ok(!touchHandler.onCancelCalled);
	ok(!detached.onStartCalled);
	ok(!detached.onEnterCalled);
	ok(!detached.onMoveCalled);
	ok(!detached.onLeaveCalled);
	ok(!detached.onEndCalled);
	ok(!detached.onCancelCalled);
	outerElement.detachTouchHandler(touchHandler);
});

test('should notify touch enter event when touch enter', function()
{
	var type = 'touchenter';
	touchHandler.reset();
	var detached = j.mockTouchHandler();
	outerElement.attachTouchHandler(touchHandler)
		.attachTouchHandler(detached);
	outerElement.detachTouchHandler(detached);
	var touchEvent = simulator.touchEvent(type);
	simulator.dispatchEvent(outerHtmlElement, touchEvent);
	ok(!touchHandler.onStartCalled);
	ok(touchHandler.onEnterCalled);
	ok(!touchHandler.onMoveCalled);
	ok(!touchHandler.onLeaveCalled);
	ok(!touchHandler.onEndCalled);
	ok(!touchHandler.onCancelCalled);
	ok(!detached.onStartCalled);
	ok(!detached.onEnterCalled);
	ok(!detached.onMoveCalled);
	ok(!detached.onLeaveCalled);
	ok(!detached.onEndCalled);
	ok(!detached.onCancelCalled);
	outerElement.detachTouchHandler(touchHandler);
});

test('should notify touch move event when touch move', function()
{
	var type = 'touchmove';
	touchHandler.reset();
	var detached = j.mockTouchHandler();
	outerElement.attachTouchHandler(touchHandler)
		.attachTouchHandler(detached);
	var touchEvent = simulator.touchEvent(type);
	outerElement.detachTouchHandler(detached);
	simulator.dispatchEvent(outerHtmlElement, touchEvent);
	ok(!touchHandler.onStartCalled);
	ok(!touchHandler.onEnterCalled);
	ok(touchHandler.onMoveCalled);
	ok(!touchHandler.onLeaveCalled);
	ok(!touchHandler.onEndCalled);
	ok(!touchHandler.onCancelCalled);
	ok(!detached.onStartCalled);
	ok(!detached.onEnterCalled);
	ok(!detached.onMoveCalled);
	ok(!detached.onLeaveCalled);
	ok(!detached.onEndCalled);
	ok(!detached.onCancelCalled);
	outerElement.detachTouchHandler(touchHandler);
});

test('should notify touch leave and touch end event when touch leave', function()
{
	var type = 'touchleave';
	touchHandler.reset();
	var detached = j.mockTouchHandler();
	outerElement.attachTouchHandler(touchHandler)
		.attachTouchHandler(detached);
	outerElement.detachTouchHandler(detached);
	var touchEvent = simulator.touchEvent(type);
	simulator.dispatchEvent(outerHtmlElement, touchEvent);
	ok(!touchHandler.onStartCalled);
	ok(!touchHandler.onEnterCalled);
	ok(!touchHandler.onMoveCalled);
	ok(touchHandler.onLeaveCalled);
	ok(touchHandler.onEndCalled);
	ok(!touchHandler.onCancelCalled);
	ok(!detached.onStartCalled);
	ok(!detached.onEnterCalled);
	ok(!detached.onMoveCalled);
	ok(!detached.onLeaveCalled);
	ok(!detached.onEndCalled);
	ok(!detached.onCancelCalled);
	outerElement.detachTouchHandler(touchHandler);
});

// test('should notify touch end event when touch end', function()
// {
	// var type = 'touchend';
	// var touchEvent = simulator.touchEvent(type);
	// touchHandler.reset();
	// outerElement.attachTouchHandler(touchHandler);
	// simulator.dispatchEvent(outerHtmlElement, touchEvent);
	// ok(!touchHandler.onStartCalled);
	// ok(!touchHandler.onMoveCalled);
	// ok(!touchHandler.onLeaveCalled);
	// ok(touchHandler.onEndCalled);
	// ok(!touchHandler.onCancelCalled);
	// outerElement.detachTouchHandler(touchHandler);
// });

test('should notify touch cancel event when touch cancel', function()
{
	var type = 'touchcancel';
	touchHandler.reset();
	var detached = j.mockTouchHandler();
	outerElement.attachTouchHandler(touchHandler)
		.attachTouchHandler(detached);
	outerElement.detachTouchHandler(detached);
	var touchEvent = simulator.touchEvent(type);
	simulator.dispatchEvent(outerHtmlElement, touchEvent);
	ok(!touchHandler.onStartCalled);
	ok(!touchHandler.onEnterCalled);
	ok(!touchHandler.onMoveCalled);
	ok(!touchHandler.onLeaveCalled);
	ok(!touchHandler.onEndCalled);
	ok(touchHandler.onCancelCalled);
	ok(!detached.onStartCalled);
	ok(!detached.onEnterCalled);
	ok(!detached.onMoveCalled);
	ok(!detached.onLeaveCalled);
	ok(!detached.onEndCalled);
	ok(!detached.onCancelCalled);
	outerElement.detachTouchHandler(touchHandler);
});

	body.remove(outerElement);
	outerElement.dispose();
});