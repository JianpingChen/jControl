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
test('select can add item using text and value', function() {
	var dropdown = j.select();
	dropdown.addItem('Male', 1)
			.addItem('Female', 0);
	equal(dropdown.numberOfChildren(), 2);
});

test('select can add item using complex content with value', function() {
	var dropdown = j.select();
	var male = j.div('sexSelect');
	male.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Male'));
	var female = j.div('maleSelect');
	female.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Female'));
	dropdown.addItem(male, 1)
			.addItem(female, 2);
	equal(dropdown.numberOfChildren(), 2);
	// only Firefox can actually display the image
	// IE, Chrome, and Safari will not display image
	// TODO: Create another dropdown control that actually displays images
	// body.add(dropdown);
});

test('select should notify value change to attached observer', function() {
	var dropdown = j.select();
	dropdown.addItem('Male', 1)
			.addItem('Female', 0);
	equal(dropdown.numberOfChildren(), 2);
	equal(dropdown.selectedIndex(), 0);
	
	var observer = j.mockEventListener();
	dropdown.subscribeToValueChange(observer.callback);
	dropdown.selectItem(1);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, dropdown);
	equal(observer.callbackArg, 0);
	equal(dropdown.getValue(), 0);
	
	observer.reset();
	dropdown.selectValue(1);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, dropdown);
	equal(observer.callbackArg, 1);
	equal(dropdown.getValue(), 1);
	dropdown.unsubscribeValueChange(observer.callback);
});

test('select should support selectValue', function() {
	var dropdown = j.select();
	dropdown.addItem('Male', 1)
			.addItem('Female', 0);
	equal(dropdown.numberOfChildren(), 2);
	
	var observer = j.mockEventListener();
	dropdown.subscribeToValueChange(observer.callback);
	dropdown.selectValue(0);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, dropdown);
	equal(observer.callbackArg, 0);
	equal(dropdown.getValue(), 0);
	dropdown.unsubscribeValueChange(observer.callback);
});

});