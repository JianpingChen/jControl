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

test('intInput should set to initial value on invalid string', function() {
	var intInput = j.intInput(3);
	intInput.setValue('xyz');
	equal(intInput.getValue(), 3);	
});

test('intInput should set to new value when value is valid int string', function() {
	var intInput = j.intInput(3);
	var newValue = '45';
	intInput.setValue(newValue);
	equal(intInput.getValue(), parseInt(newValue));	
});

test('intInput should set to new value when value is integer', function() {
	var intInput = j.intInput(3);
	var newValue = 78;
	intInput.setValue(newValue);
	equal(intInput.getValue(), newValue);	
});

test('intInput should notify value change', function() {
	var listener = j.mockEventListener();
	var intInput = j.intInput();
	intInput.subscribeToValueChange(listener.callback);
	var newValue = '45';
	intInput.setValue(newValue);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, intInput);
	equal(listener.callbackArg, parseInt(newValue));
});

test('floatInput should set to initial value on invalid string', function() {
	var intInput = j.floatInput(5.0);
	intInput.setValue('xyz');
	equal(intInput.getValue(), 5.0);	
});

test('floatInput should set to new value on valid float string', function() {
	var intInput = j.floatInput(5.0);
	var newValue = '42.3';
	intInput.setValue(newValue);
	equal(intInput.getValue(), parseFloat(newValue));	
});

test('floatInput should set to new value on valid float', function() {
	var intInput = j.floatInput(5.0);
	var newValue = 98.7;
	intInput.setValue(newValue);
	equal(intInput.getValue(), newValue);	
});

test('floatInput should notify value change', function() {
	var listener = j.mockEventListener();
	var intInput = j.floatInput();
	intInput.subscribeToValueChange(listener.callback);
	var newValue = 145.23;
	intInput.setValue(newValue);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, intInput);
	equal(listener.callbackArg, newValue);
});

});