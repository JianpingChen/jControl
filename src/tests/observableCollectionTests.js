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
	var collection = j.observableCollection();
	var listener = j.mockEventListener();
	collection.subscribeToChange(listener.callback);
	
QUnit.config.reorder = false;

test('must notify listener when items are cleared', function() {
	collection.add(1).add(3);
	ok(collection.numOfItems() > 0);
	listener.reset();
	collection.clear();
	equal(0, collection.numOfItems());
	ok(listener.callbackInvoked);
	equal(listener.callbackArg.change, collection.change.clear);
	deepEqual(listener.callbackArg.item, collection);
});

test('must notify listener when item is added', function(){
	var item = 5;
	listener.reset();
	collection.add(item);
	ok(listener.callbackInvoked);
	equal(listener.callbackArg.change, collection.change.add);
	equal(listener.callbackArg.item, item);
});

test('must notify listener when item is removed', function() {
	collection.clear();
	collection.add(1).add(3);
	equal(2, collection.numOfItems());
	listener.reset();
	collection.remove(1);
	equal(1, collection.numOfItems());
	ok(listener.callbackInvoked);
	equal(listener.callbackArg.change, collection.change.remove);
	deepEqual(listener.callbackArg.item, 1);
});

test('must not notify detached listener', function(){
	collection.add(7).add(9);
	listener.reset();
	collection.unsubscribeChange(listener.callback);
	collection.add(11);
	ok(!listener.callbackInvoked);
	collection.remove(7);
	ok(!listener.callbackInvoked);
	collection.clear();
	ok(!listener.callbackInvoked);
});

});