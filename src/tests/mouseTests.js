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
	var element = j.div('testDiv').setMinWidth('16').setMinHeight('16');
	var body = j.body().add(element);
	var htmlElement = element.getHtmlElement();
	var simulator = j.mouseEventSimulator();	
	
test("element should notify attached mouse handler mouse click event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'click';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(mouseHandler1.onClickCalled, 'should call this');
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	});

test("element should not notify detached mouse handler mouse click event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'click';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled, 'should not call this');
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse click event',
function(){
	var type = 'click';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(mouseHandler1.onClickCalled, 'should call this');
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(mouseHandler2.onClickCalled, 'should call this');
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse double click event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'dblclick';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse double click event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'dblclick';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse double click event',
function(){
	var type = 'dblclick';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse button down event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousedown';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should notify attached mouse handler mouse button down event when mouse left button down", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousedown';
	var leftButtonDown = simulator.mouseEvent(type, 0, 0, 0, 0, 0);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, leftButtonDown);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(mouseHandler1.onMouseDownCalled);
	equal(mouseHandler1.mouseButton, 0);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should notify attached mouse handler mouse button down event when mouse middle button down", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousedown';
	var leftButtonDown = simulator.mouseEvent(type, 0, 0, 0, 0, 1);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, leftButtonDown);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(mouseHandler1.onMouseDownCalled);
	equal(mouseHandler1.mouseButton, 1);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should notify attached mouse handler mouse button down event when mouse right button down", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousedown';
	var leftButtonDown = simulator.mouseEvent(type, 0, 0, 0, 0, 2);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, leftButtonDown);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(mouseHandler1.onMouseDownCalled);
	equal(mouseHandler1.mouseButton, 2);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse button down event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousedown';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse button down event',
function(){
	var type = 'mousedown';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse move event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousemove';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse move event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousemove';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse move event',
function(){
	var type = 'mousemove';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse enter event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseover';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse enter event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseover';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse enter event',
function(){
	var type = 'mouseover';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse leave event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseout';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(mouseHandler1.onMouseLeaveCalled);
	ok(mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse leave event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseout';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse leave event',
function(){
	var type = 'mouseout';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(mouseHandler1.onMouseLeaveCalled);
	ok(mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(mouseHandler2.onMouseLeaveCalled);
	ok(mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse button up event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseup';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse button up event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mouseup';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse button up event',
function(){
	var type = 'mouseup';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(mouseHandler2.onMouseUpCalled);
	ok(!mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

test("element should notify attached mouse handler mouse wheel event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousewheel';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(mouseHandler1.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
});

test("element should not notify detached mouse handler mouse wheel event", 
function(){
	var mouseHandler1 = j.mockMouseHandler();
	var type = 'mousewheel';
	var click = simulator.mouseEvent(type);
	element.attachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(!mouseHandler1.onMouseWheelCalled);
});
	
test('element can have more than one mouse handlers attached and it should notify all mouse handlers mouse wheel event',
function(){
	var type = 'mousewheel';
	var click = simulator.mouseEvent(type);
	var mouseHandler1 = j.mockMouseHandler();
	var mouseHandler2 = j.mockMouseHandler();
	element.attachMouseHandler(mouseHandler1);
	element.attachMouseHandler(mouseHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!mouseHandler1.onClickCalled);
	ok(!mouseHandler1.onDoubleClickCalled);
	ok(!mouseHandler1.onMouseDownCalled);
	ok(!mouseHandler1.onMouseMoveCalled);
	ok(!mouseHandler1.onMouseEnterCalled);
	ok(!mouseHandler1.onMouseLeaveCalled);
	ok(!mouseHandler1.onMouseOutCalled);
	ok(!mouseHandler1.onMouseUpCalled);
	ok(mouseHandler1.onMouseWheelCalled);
	ok(!mouseHandler2.onClickCalled);
	ok(!mouseHandler2.onDoubleClickCalled);
	ok(!mouseHandler2.onMouseDownCalled);
	ok(!mouseHandler2.onMouseMoveCalled);
	ok(!mouseHandler2.onMouseEnterCalled);
	ok(!mouseHandler2.onMouseLeaveCalled);
	ok(!mouseHandler2.onMouseOutCalled);
	ok(!mouseHandler2.onMouseUpCalled);
	ok(mouseHandler2.onMouseWheelCalled);
	element.detachMouseHandler(mouseHandler1);
	element.detachMouseHandler(mouseHandler2);
});

body.clear();

});