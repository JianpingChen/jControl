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
	var sender = j.div();
	var eventPayload = 'message';
	var target = j.customEvent();
	var listener = j.mockEventListener();
	
test('listener can be attached and detached from a customEvent', function(){
	target.subscribe(listener.callback);
	equal(target.numOfListeners(), 1);
	target.unsubscribe(listener.callback);
	equal(target.numOfListeners(), 0);
});

test("customEvent should notify listener when event is raised", function() {
	target.subscribe(listener.callback);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
	equal(target.numOfListeners(), 1);
	target.raiseEvent(sender, eventPayload);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, sender);
	equal(listener.callbackArg, eventPayload);
	target.unsubscribe(listener.callback);
	listener.reset();
});

test('customEvent should NOT notify detached listener', function(){
	listener.reset();
	target.subscribe(listener.callback);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
	target.unsubscribe(listener.callback);
	equal(target.numOfListeners(), 0);
	target.raiseEvent(sender, eventPayload);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
});

test('customEvent should NOT allow the same (callback) to subscribe twice', function(){
	listener.reset();
	target.subscribe(listener.callback);
	equal(target.numOfListeners(), 1);
	target.subscribe(listener.callback);
	equal(target.numOfListeners(), 1);
	target.unsubscribe(listener.callback);
	equal(target.numOfListeners(), 0);
});

test("customEvent clear should remove all listeners", function(){
	target.subscribe(listener.callback);
	equal(target.numOfListeners(), 1);
	target.clear();
	equal(target.numOfListeners(), 0);
	listener.reset();
	target.raiseEvent(sender, eventPayload);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
});
	target.dispose();
	
});