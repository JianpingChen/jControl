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
require(['../lib/jControl.js'],
function(j)
{

QUnit.config.reorder = false;

test('string should support trim', function(){
	var str = '\r\n\t x \t';
	var trimmed = str.trim();
	equal(trimmed, 'x');
});

test('string should support stratsWith', function(){
	var str = 'x y';
	ok(str.startsWith('x'));
	ok(!str.startsWith('y'));
});

test('string should support endsWith', function(){
	var str = 'x y';
	ok(!str.endsWith('x'));
	ok(str.endsWith('y'));
});

test('string should support contains', function(){
	var str = 'x y z';
	ok(str.contains('y'));
	ok(!str.contains('yy'));
	ok(!str.contains('yyyyyy'));
});

});