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
require(['../lib/jControl.js'],
function(j) 
{
	var element = j.div('testDiv').setMinWidth('16').setMinHeight('16');
	var body = j.body().add(element);
	var htmlElement = element.getHtmlElement();
	var simulator = j.dragdropEventSimulator();
	var handler = j.mockDragDropHandler();
	element.attachDragDropHandler(handler);
	var handler2 = j.mockDragDropHandler();
	
test('HTML5: element should notify drag drop handler drag event', function()
{
	var type = 'drag';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragCalled);
});

test('HTML5: element should notify drag drop handler drag start event', function()
{
	var type = 'dragstart';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragStartCalled);
});

test('HTML5: element should notify drag drop handler drag end event', function()
{
	var type = 'dragend';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragEndCalled);
});

test('HTML5: element should notify drag drop handler drag enter event', function()
{
	var type = 'dragenter';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragEnterCalled);
});

test('HTML5: element should notify drag drop handler drag over event', function()
{
	var type = 'dragover';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragOverCalled);
});

test('HTML5: element should notify drag drop handler drag leave event', function()
{
	var type = 'dragleave';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDragLeaveCalled);
});

test('HTML5: element should notify drag drop handler drop event', function()
{
	var type = 'drop';
	var drag = simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	simulator.dispatchEvent(htmlElement, drag);
	ok(handler.onDropCalled);
});

test('HTML5: element may have more than one dragdrop handlers, they should all be notified when drop event happens', function()
{
	var type = 'drop';
	var dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	handler.reset();
	element.attachDragDropHandler(handler2);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDropCalled);
	ok(handler2.onDropCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDropCalled);
	ok(!handler2.onDropCalled);
});

test('HTML5: element may have more than one dragdrop handlers, they should all be notified when drag event happens', function()
{
	type='drag';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragCalled);
	ok(handler2.onDragCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragCalled);
	ok(!handler2.onDragCalled);
});
	
test('HTML5: element may have more than one dragdrop handlers, they should all be notified when dragstart event happens', function()
{
	type='dragstart';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragStartCalled);
	ok(handler2.onDragStartCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragStartCalled);
	ok(!handler2.onDragStartCalled);
});
	
test('HTML5: element may have more than one dragdrop handlers, they should all be notified when dragend event happens', function()
{
	type='dragend';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragEndCalled);
	ok(handler2.onDragEndCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragEndCalled);
	ok(!handler2.onDragEndCalled);
});	

test('HTML5: element may have more than one dragdrop handlers, they should all be notified when dragenter event happens', function()
{	
	type='dragenter';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragEnterCalled);
	ok(handler2.onDragEnterCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragEnterCalled);
	ok(!handler2.onDragEnterCalled);
});	

test('HTML5: element may have more than one dragdrop handlers, they should all be notified when dragover event happens', function()
{		
	type='dragover';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragOverCalled);
	ok(handler2.onDragOverCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragOverCalled);
	ok(!handler2.onDragOverCalled);
});
	
test('HTML5: element may have more than one dragdrop handlers, they should all be notified when dragleave event happens', function()
{	
	type='dragleave';
	element.attachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	dragdropEvent= simulator.dragdropEvent(htmlElement, type);
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragLeaveCalled);
	ok(handler2.onDragLeaveCalled);
	element.detachDragDropHandler(handler2);
	handler.reset();
	handler2.reset();
	simulator.dispatchEvent(htmlElement, dragdropEvent);
	ok(handler.onDragLeaveCalled);
	ok(!handler2.onDragLeaveCalled);
});

});