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
test('spanText should have SPAN tag', function(){
	var initial = 'This is a textBlock';
	var t = j.spanText(initial);
	equal(t.getTagName(), 'SPAN');
	equal(t.getTextContent(), initial);
});

test('can set content of spanText', function(){
	var t = j.spanText('This is a textBlock');
	var c = 'message';
	t.setTextContent(c);
	equal(t.getTextContent(), c);
});

});