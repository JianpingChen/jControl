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

	var p = j.popup();
	var content = j.div().add(j.textBlock('text content'))
						.add(j.img('./image.gif', '', 120, 150));
						
test('popup should have class popup', function(){
	ok(p.hasClass('popup'));
});

test('popup should support add content', function(){
	p.add(content);
	ok(p.hasElement(content));
});

test('popup should support setContentZIndex', function(){
	p.setContentZIndex(123);
	ok(p.getZIndex() == 123);
});

test('popup will popup at upperleft corner of window by default', function(){
	var pos = p.getPopupPosition();
	equal(pos.left, 0);
	equal(pos.top, 0);
});

test('centerPopup should set popup position to middle of window', function(){
	//p.centerPopup();
	p.showAtCenter();
	var pos = p.getPopupPosition();
	var bodySize = j.body().getInnerSize();
	var winSize = j.windowElement().getInnerSize();
	var contentSize = p.getOuterSize();
	ok(Math.abs(pos.left - (bodySize.width - contentSize.width)/2) < 1);
	ok(Math.abs(pos.top - (winSize.height - contentSize.height)/2) < 1);
	p.close();
});

test('popup should be invisible until show and close should make it invisible', function(){
	ok(!p.isVisible());
	p.showAtCenter();
	ok(p.isVisible());
	p.close();
	ok(!p.isVisible());
});

test('showAt function should set the popup position and moveToPosition function should move popup to new position', function(){
	var at = j.position(100, 120);
	p.showAt(at.left, at.top);
	var pos = p.getPopupPosition();
	equal(pos.left, at.left);
	equal(pos.top, at.top);
	var newPos = j.position(150, 180);
	p.moveToPosition(newPos.left, newPos.top);
	pos = p.getPopupPosition();
	equal(pos.left, newPos.left);
	equal(pos.top, newPos.top);
	p.close();
});

test('popup should notify status change listeners', function(){
	var listener = j.mockEventListener();
	p.subscribeToStatusChange(listener.callback);
	ok(!listener.callbackInvoked);
	p.showAtCenter();
	ok(listener.callbackInvoked);
	ok(listener.callbackArg);
	listener.reset();
	p.close();
	ok(listener.callbackInvoked);
	ok(!listener.callbackArg);
	p.unsubscribeStatusChange(listener.callback);
	listener.reset();
	p.showAtCenter();
	ok(!listener.callbackInvoked);
	ok(!listener.callbackArg);
	listener.reset();
	p.close();
	ok(!listener.callbackInvoked);
	ok(!listener.callbackArg);
});

	p.dispose();
});