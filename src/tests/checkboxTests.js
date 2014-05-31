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
test('checkbox should have initial value false', function(){
	var checkBox = j.checkbox();
	ok(!checkBox.getValue());
});

test('checkbox should allow setting value with bool values', function(){
	var checkBox = j.checkbox();
	checkBox.setValue(true);
	ok(checkBox.getValue());
	checkBox.setValue(false);
	ok(!checkBox.getValue());
});

test('checkBox should notify value change when monitored', function(){
	var checkBox = j.checkbox();
	var observer = j.mockEventListener();
	checkBox.subscribeToValueChange(observer.callback);
	
	ok(!observer.callbackInvoked);
	checkBox.setValue(true);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, checkBox);
	ok(observer.callbackArg);
});

test('checkBox should support detach value change listener', function(){
	var checkBox = j.checkbox();
	var observer = j.mockEventListener();
	checkBox.subscribeToValueChange(observer.callback);
	
	ok(!observer.callbackInvoked);
	checkBox.setValue(true);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, checkBox);
	ok(observer.callbackArg);
	observer.reset();
	checkBox.unsubscribeValueChange(observer.callback);
	checkBox.setValue(false);
	ok(!observer.callbackInvoked);
	equal(observer.sender, null);
	equal(observer.callbackArg, null);
});

test('checkBox should NOT notify value change when set to the same value', function(){
	var checkBox = j.checkbox();
	var observer = j.mockEventListener();
	checkBox.subscribeToValueChange(observer.callback);
	
	ok(!observer.callbackInvoked);
	checkBox.setValue(false);
	ok(!observer.callbackInvoked);
});

test('checkbox should support toggle editable', function(){
	var checkBox = j.checkbox();
	ok(checkBox.isEditable());
	checkBox.toggleEditable();
	ok(!checkBox.isEditable());
	checkBox.toggleEditable();
	ok(checkBox.isEditable());
	checkBox.toggleEditable(true);
	ok(checkBox.isEditable());
	checkBox.toggleEditable(false);
	ok(!checkBox.isEditable());
});

});