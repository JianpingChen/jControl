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
	var body = j.body();
	
test('divButton can be constructed with a name', function(){
	var name = 'divbutton';
	var b = j.divButton(name);
	equal(b.getName(), name);
});

test('divButton can add img', function(){
	var b = j.divButton();
	var img = j.img('./image.gif', '', 20, 20);
	b.add(img);
	equal(b.numberOfChildren(), 1);
	b.dispose();
});

test('divButton can add text node', function(){
	var b = j.button();
	var text = j.textNode('button');
	b.add(text);
	equal(b.numberOfChildren(), 1);
	b.dispose();
});

test('divButton can attach click listener, listener is notified when mouse down; after detaching, listener should no longer receive notification', function(){
	var b = j.divButton();
	var text = j.textNode('button');
	b.add(text);
	// must add to body for the event to trigger
	body.add(b);
	var listener = j.mockEventListener();
	var mouse = j.mouseEventSimulator();
	var click = mouse.mouseEvent('mouseup');
	b.subscribeToClick(listener.callback);
	mouse.dispatchEvent(b.getHtmlElement(), click);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, b);
	
	b.unsubscribeClick(listener.callback);
	listener.reset();
	ok(!listener.callbackInvoked);
	mouse.dispatchEvent(b.getHtmlElement(), click);
	ok(!listener.callbackInvoked);
	
	body.remove(b);
	b.dispose();
});

test('divButton can be enabled and disabled', function(){
	var b = j.button();
	ok(b.isEnabled());
	b.disable();
	ok(!b.isEnabled());
	b.enable();
	ok(b.isEnabled());
});

test('button content can be replaced', function(){
	var img = j.img('./image.gif', '', 20, 20);
	var b = j.divButton('imageButton');
	b.add(img);
	body.add(b);
	deepEqual(b.getChildElement(0), img);
	var text = j.textBlock('button');
	b.clear();
	b.add(text);
	deepEqual(b.getChildElement(0), text);
	body.remove(b);
	b.dispose();
});


test('divButton can be disposed', function(){
	var b = j.divButton();
	body.add(b);
	ok(body.containsHtmlElement(b.getHtmlElement()));
	body.remove(b);
	ok(!body.containsHtmlElement(b.getHtmlElement()));
	b.dispose();
});

});