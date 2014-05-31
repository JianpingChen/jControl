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
	
	var text = j.textInput();
	var div = j.div().setOuterSize(j.size(90, 32));
	var b = j.body();
	b.add(div.add(text));

	var resizeListener = j.mockEventListener();

test('should notify resize listener when size is changed', function(){
	div.subscribeToSizeChange(resizeListener.callback);
	ok(!resizeListener.callbackInvoked);
	ok(resizeListener.callbackArg == null);
	div.setInnerSize(j.size(120, 44));
	ok(resizeListener.callbackInvoked);
	deepEqual(resizeListener.sender, div);
	// IE 8 won't pass event param
	//ok(resizeListener.callbackArg != null);
	div.unsubscribeSizeChange(resizeListener.callback);
	resizeListener.reset();
	ok(!resizeListener.callbackInvoked);
	div.setOuterSize(j.size(220, 144));
	ok(!resizeListener.callbackInvoked);
});

	b.remove(div);
	div.dispose();
});