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

	var name = 'testContainer';
	var v = j.valueContainer(name);

test('valueContainer should have function subscribeToValueChange', function(){
	ok(typeof v.subscribeToValueChange == 'function');
});

test('valueContainer should have function unsubscribeValueChange', function(){
	ok(typeof v.unsubscribeValueChange == 'function');
});

test('valueContainer should have function numberOfValueChangeListeners', function(){
	ok(typeof v.numberOfValueChangeListeners == 'function');
});

test('valueContainer should have function raiseValueChanged', function(){
	ok(typeof v.raiseValueChanged == 'function');
});

});
