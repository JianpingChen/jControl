/*
This file is part of jControl® JavaScript library, an object oriented JavaScript programming environment.

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
	var body = j.body();
	var div = j.div('scrollPanel').setOuterHeight(50).setOverflow('scroll');
	var t1 = j.textBlock('text1');
	var t2 = j.textBlock('text2');
	var t3 = j.textBlock('text3');
	var t4 = j.textBlock('text4');
	var t5 = j.textBlock('text5');
	var t6 = j.textBlock('text6');
	var t7 = j.textBlock('text7');
	var t8 = j.textBlock('text8');
	div.add(t1)
		.add(t2)
		.add(t3)
		.add(t4)
		.add(t5)
		.add(t6)
		.add(t7);
	body.add(div);
		
test('set div scrollTop should work', function()
{
	div.setScrollTop(t5.getScreenPosition().top-div.getScreenPosition().top);
	ok(Math.abs(div.getScrollPosition().top-( t1.getOuterHeight()+t2.getOuterHeight()+t3.getOuterHeight()+t4.getOuterHeight()) < 1));
});

	body.remove(div);
	div.dispose();
});