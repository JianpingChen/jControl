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
	var target = j.observable();
	var listener = j.mockEventListener();

test("observable should send message to attached observer", function() {
	target.subscribeToValueChange(listener.callback);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
	target.raiseEvent(eventPayload);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, target);
	equal(listener.callbackArg, eventPayload);
	target.unsubscribeValueChange(listener.callback);
});

test('observable should not notify detached observer', function() {
	target.subscribeToValueChange(listener.callback);
	listener.reset();
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
	target.unsubscribeValueChange(listener.callback);
	target.raiseEvent(eventPayload);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
});

test("observable clear function should remove all observers", function(){
	target.subscribeToValueChange(listener.callback);
	target.clear();
	listener.reset();
	target.raiseEvent(eventPayload);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
});
	target.dispose();
});