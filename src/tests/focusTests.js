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
	var div = j.datetimeInput();
	var b = j.body();
	b.add(text).add(div);
	var textFocusHandler = j.mockFocusHandler();
	var divFocusHandler = j.mockFocusHandler();

asyncTest('should notify focus handler when element is focused', function(){
	text.attachFocusHandler(textFocusHandler);
	textFocusHandler.reset();
	text.focus();
	
	setTimeout(function() {
		ok(textFocusHandler.onFocusCalled);
		deepEqual(textFocusHandler.focusSender, text);
		ok(textFocusHandler.focusEvent != undefined);
		text.detachFocusHandler(textFocusHandler);
		start();
	}, 50);
});

asyncTest('should notify focus handler when element has lost focus', function(){
	text.attachFocusHandler(textFocusHandler);
	div.attachFocusHandler(divFocusHandler);
	textFocusHandler.reset();
	divFocusHandler.reset();
	div.focus();
	
	setTimeout(function() {
		ok(textFocusHandler.onLostFocusCalled);
		deepEqual(textFocusHandler.lostFocusSender, text);
		ok(textFocusHandler.lostFocusEvent != undefined);
		text.detachFocusHandler(textFocusHandler);
		ok(divFocusHandler.onFocusCalled);
		deepEqual(divFocusHandler.focusSender, div);
		ok(divFocusHandler.focusEvent != undefined);
		div.detachFocusHandler(divFocusHandler);
		start();
		b.remove(text).remove(div);
	}, 50);
});

});