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

test('body should be a singleton', function(){
	var body1 = j.body();
	var body2 = j.body();
	deepEqual(body1, body2);
});
	
test('body is always attached to DOM', function(){
	var body = j.body();
	ok(body.isAttachedToDom());
});

test('offset parent of body is document', function(){
	var body = j.body();
	deepEqual(body.getOffsetParent(), j.documentElement());
});

test("body can add a div", function() {
		var body = j.body();
		var div = j.div('div1');
		div.isDisposeCalled = false;
		var baseDispose = div.dispose;
		div.dispose = function()
		{
			div.isDisposeCalled = true;
			baseDispose();
		};
		var data = Date.now().toString(16);
		div.attachData(data);
		
		body.add(div);
		deepEqual(body.getChildByData(data), div, "deep equal div");
		body.remove(div);
		equal(body.getChildByData(data), null, "must be removed");
		ok(!div.isDisposeCalled, 'remove should not call dispose');
	});
});