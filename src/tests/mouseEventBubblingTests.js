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
	var childMouseHandler = j.mockMouseHandler();
	childMouseHandler.mouseDownCalled = false;
	innerElement.attachMouseHandler(childMouseHandler);
	var parentMouseHandler = j.mockMouseHandler();
	outerElement.attachMouseHandler(parentMouseHandler);
	
test('When inner element mouse handler does not stop stopPropagation, outer element mouse handler should also receive event', function(){
	var type = 'mousedown';
	var mouseDown = simulator.mouseEvent(type);
	simulator.dispatchEvent(textBlock.getHtmlElement(), mouseDown);
	ok(childMouseHandler.onMouseDownCalled);
	ok(parentMouseHandler.onMouseDownCalled);
	});
	
test('When inner element mouse handler stop stopPropagation, outer element mouse handler should not receive event', function(){
	var type = 'mousedown';
	var mouseDown = simulator.mouseEvent(type);
	var baseMouseDown = childMouseHandler.onMouseDown;
	childMouseHandler.onMouseDown = function(sender, mouseEvent)
	{
		baseMouseDown(sender, mouseEvent);
		mouseEvent.stopPropagation();
	};
	childMouseHandler.reset();
	var parentBaseMethod = parentMouseHandler.onMouseDown;
	parentMouseHandler.onMouseDown = function(sender, mouseEvent)
	{
		parentBaseMethod(sender, mouseEvent);
		alert('parentMouse handler called');
	};
	parentMouseHandler.reset();
	simulator.dispatchEvent(textBlock.getHtmlElement(), mouseDown);
	ok(childMouseHandler.onMouseDownCalled);
	ok(!parentMouseHandler.onMouseDownCalled);
	});
	
	body.remove(outerElement);
	outerElement.dispose();
});