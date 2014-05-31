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

function windowSize()
{
	return j.size( 
	window.innerWidth ? window.innerWidth : document.documentElement.offsetWidth,
	window.innerHeight ? window.innerHeight : document.documentElement.offsetHeight
	);
};

test('windowElement should be a singleton', function(){
	var body1 = j.windowElement();
	var body2 = j.windowElement();
	deepEqual(body1, body2);
});
	
test('windowElement is always attached to DOM', function(){
	var windowElement = j.windowElement();
	ok(windowElement.isAttachedToDom());
});

test('windowElement outerSize equals to window size', function(){
	var windowElement = j.windowElement();
	var outer = windowElement.getOuterSize();
	equal(outer.width, windowSize().width);
	equal(outer.height, windowSize().height);
});

test('windowElement getInnerSize equals to window size', function(){
	var windowElement = j.windowElement();
	var inner = windowElement.getInnerSize();
	equal(inner.width, windowSize().width);
	equal(inner.height, windowSize().height);
});

test('windowElement height equals window innerHeight', function(){
	var windowElement = j.windowElement();
	equal(windowElement.height(), windowSize().height);
});

test('windowElement width equals window innerWidth', function(){
	var windowElement = j.windowElement();
	equal(windowElement.width(), windowSize().width);
});

test('windowElement innHeight equals window getInnerHeight', function(){
	var windowElement = j.windowElement();
	equal(windowElement.getInnerHeight(), windowSize().height);
});

test('windowElement innerWidth equals window innerWidth', function(){
	var windowElement = j.windowElement();
	equal(windowElement.getInnerWidth(), windowSize().width);
});

test('windowElement has no computed style', function(){
	var windowElement = j.windowElement();
	equal(windowElement.getComputedStyle(), null);
});

});