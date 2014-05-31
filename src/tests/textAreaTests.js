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
	
test('textArea should have TEXTAREA tag', function(){
	var t = j.textArea();
	equal(t.getTagName(), 'TEXTAREA');
});

test('textArea can accept initial content', function(){
	var initValue = 'This is a textArea';
	var t = j.textArea(initValue);
	equal(t.getValue(), initValue);
});

test('textArea can set cols and rows', function(){
	var t = j.textArea('This is a textArea');
	t.cols(3).rows(5);
	var e = t.getHtmlElement();
	equal(e.getAttribute('cols'), 3);
	equal(e.getAttribute('rows'), 5);
});

test('textArea can accept HTML content as initiala value and treat it as text', function(){
	var female = j.div('maleSelect');
	female.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Female'));
	var t = j.textArea(female.getOuterHtml());
	t.cols(80).rows(20);
	equal(t.getValue(), female.getOuterHtml());
});

test('textArea can accept HTML content as value', function(){
	var female = j.div('femaleSelect');
	female.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Female'));
	var t = j.textArea("");
	t.setValue(female.getOuterHtml());
	equal(t.getValue(), female.getOuterHtml());
});

test('textArea should notify value change', function(){
	var initValue = 'This is a textArea';
	var t = j.textArea(initValue);
	var listener = j.mockEventListener();
	var newValue = 'We put in some new value';
	t.subscribeToValueChange(listener.callback);
	t.setValue(newValue);
	
	equal(t.getValue(), newValue);
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, t);
	equal(listener.callbackArg, newValue);
});

});