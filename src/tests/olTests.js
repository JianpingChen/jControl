/*
This file is part of jControl� JavaScript library, an object oriented JavaScript programming framework.

Copyright (C) 2014 Visual Dynamics Software Ltd.
Trademark jControl� is a registered trademark of Visual Dynamics Software Ltd.

jControl� Open Source is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jControl� Open Source is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with jControl� Open Source.  If not, see <http://opensource.org/licenses/GPL-3.0/>.

Contact information: jp.chen.jianping@gmail.com
*/
require(['../lib/jControl'],
function(j)
{
	var body = j.body();
test('ol should have OL tag', function(){
	var ol = j.ol();
	equal(ol.getTagName(), 'OL');
});

test('can add string item to ol', function(){
	var ol = j.ol();
	ol.addItem('message');
	equal(ol.numberOfChildren(), 1);
	var child = ol.getChildElement(0);
	equal(child.getTagName(), 'LI');
});

test('can add complicated content to ol', function(){
	var female = j.div('maleSelect');
	female.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Female'));
	var ol = j.ol();
	ol.addItem(female);
	equal(ol.numberOfChildren(), 1);
	var child = ol.getChildElement(0);
	equal(child.getTagName(), 'LI');
});

});