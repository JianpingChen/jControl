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

test('radioButton should have INPUT tag and type radio', function() {
	var r = j.radioButton();
	equal(r.getTagName(), 'INPUT');
	equal(r.getAttributeValue('type'), 'radio');
});

test('radioButton should notify observers when value changed', function() {
	var r = j.radioButton();
	var observer = j.mockEventListener();
	
	r.subscribeToValueChange(observer.callback);
	r.setValue(true);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, r);
	equal(observer.callbackArg, true);
	equal(r.getValue(), true);
	
	observer.reset();
	r.setValue(false);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, r);
	equal(r.getValue(), false);
	equal(observer.callbackArg, false);
});

});