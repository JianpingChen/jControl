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

test('documentElement should be a singleton', function(){
	var body1 = j.documentElement();
	var body2 = j.documentElement();
	deepEqual(body1, body2);
});
	
test('documentElement is always attached to DOM', function(){
	var documentElement = j.documentElement();
	ok(documentElement.isAttachedToDom());
});

test('offset parent of documentElement is document', function(){
	var documentElement = j.documentElement();
	deepEqual(documentElement.getOffsetParent(), j.documentElement());
});

test('documentElement outerSize equals to window size', function(){
	var documentElement = j.documentElement();
	var body = j.body();
	var largeImage = j.img('./bigImage.jpg', 'scrollable', 800, 600);
	body.add(largeImage);
	var imgSize = largeImage.getOuterSize();
	var bodySize = body.getOuterSize();
	var outer = documentElement.getOuterSize();
	ok(bodySize.width >= imgSize.width);
	ok(bodySize.height >= imgSize.height);
	ok(outer.width >= bodySize.width);
	ok(outer.height >= bodySize.height);
});

test('documentElement should have computed style', function(){
	var documentElement = j.documentElement();
	ok(documentElement.getComputedStyle() != null);
});

});
