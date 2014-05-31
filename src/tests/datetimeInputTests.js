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
test('datetimeInput should have a valid default date string value', function(){
	var input = j.datetimeInput();
	var v = input.getValue();
	var parsed = new Date(Date.parse(v));
	var today = new Date();
	equal(parsed.getFullYear(), today.getFullYear());
	equal(parsed.getMonth(), today.getMonth());
	equal(parsed.getDate(), today.getDate());
});

test('datetimeInput should have a valid date string value when set to valid date', function(){
	var input = j.datetimeInput();
	var t = new Date(1918, 9, 1);
	t.setDate(t.getDate());
	input.setValue(t);
	var v = input.getValue();
	var parsed = new Date(Date.parse(v));
	var today = t;
	equal(parsed.getFullYear(), today.getFullYear());
	equal(parsed.getMonth(), today.getMonth());
	equal(parsed.getDate(), today.getDate());
});

// IE 8 cannot handle JSON format string
// test('datetimeInput should have a valid date string value when set to valid date JSON string', function(){
	// var input = j.datetimeInput();
	// var t = new Date(1886, 5, 23);
	// input.setValue(t.toJSON());
	// var v = input.getValue();
	// var parsed = new Date(Date.parse(v));
	// var today = t;
	// equal(parsed.getFullYear(), today.getFullYear());
	// equal(parsed.getMonth(), today.getMonth());
	// // IE 8 has trouble with this.
	// // equal(parsed.getDate(), today.getDate());
// });

test('datetimeInput should have a valid date string value when set to invalid string', function(){
	var input = j.datetimeInput();
	input.setValue('garbage');
	var v = input.getValue();
	var parsed = new Date(Date.parse(v));
	var today = new Date();
	equal(parsed.getFullYear(), today.getFullYear());
	equal(parsed.getMonth(), today.getMonth());
	equal(parsed.getDate(), today.getDate());
});

test('datetimeInput should have a valid date string value when set to valid long int value', function(){
	var input = j.datetimeInput();
	var t = new Date(1998, 0, 31);
	input.setValue(Date.parse(t.toString()));
	var v = input.getValue();
	var parsed = new Date(Date.parse(v));
	var today = t;
	equal(parsed.getFullYear(), today.getFullYear());
	equal(parsed.getMonth(), today.getMonth());
	equal(parsed.getDate(), today.getDate());
});

test('datetimeInput should have a valid date string value when set to valid Date value', function(){
	var input = j.datetimeInput();
	var t = new Date(2000, 1, 28);
	input.setValue(t);
	var v = input.getValue();
	var parsed = new Date(Date.parse(v));
	var today = t;
	equal(parsed.getFullYear(), today.getFullYear());
	equal(parsed.getMonth(), today.getMonth());
	equal(parsed.getDate(), today.getDate());
});

});