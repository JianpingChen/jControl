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
	
test("div should have DIV tag", function(){
	var element = j.div();
	var htmlElement = element.getHtmlElement();

	equal(htmlElement.tagName, 'DIV');
	equal(element.getTagName(), 'DIV');
});

test("div can be constructed with a name", function(){
	var name = 'divName';
	var element = j.div(name);
	var htmlElement = element.getHtmlElement();
	
	equal(htmlElement.getAttribute('name'), name);
	equal(element.getName(), name);
});

test("div can be added to and removed from another div without being disposed", function(){
	var name = 'divName';
	var element = j.div(name);
	var child = j.div('childDiv');
	var isDisposed = false;
	child.dispose = function()
	{
		isDisposed = true;
		origDispose();
	};
	element.add(child);
	ok(!isDisposed);
	equal(element.numberOfChildren(), 1);
	deepEqual(element.getChildElement(0), child);
	element.remove(child);
	equal(element.numberOfChildren(), 0);
	ok(!isDisposed);
});

test("div can be toggle selectable and when it is called should call child toggle selectable", function(){
	var name = 'divName';
	var element = j.div(name);
	var child = j.div('childDiv');
	var toggleCalled = false;
	var origToggle = child.toggleSelectable;
	child.toggleSelectable = function(isSelectable)
	{
		toggleCalled = true;
		origToggle(isSelectable);
	};
	
	element.add(child);
	equal(element.numberOfChildren(), 1);
	element.toggleSelectable(false);
	ok(toggleCalled);
});

test("div clear should call child dispose", function(){
	var name = 'divName';
	var element = j.div(name);
	var child = j.div('childDiv');
	var isDisposed = false;
	element.add(child);
	equal(element.numberOfChildren(), 1);
	var origDispose = child.dispose;
	child.dispose = function()
	{
		isDisposed = true;
		origDispose();
	};
	element.clear();
	ok(isDisposed);
});

test("div dispose should call child dispose", function(){
	var name = 'divName';
	var element = j.div(name);
	var child = j.div('childDiv');
	var isDisposed = false;
	element.add(child);
	equal(element.numberOfChildren(), 1);
	var origDispose = child.dispose;
	child.dispose = function()
	{
		isDisposed = true;
		origDispose();
	};
	element.dispose();
	ok(isDisposed);
});

test("div size should respect inline style", function(){
	var name = 'divName';
	var element = j.div(name);
	var body = j.body();
	body.add(element);
	var oSize = element.getOuterSize();
	// by default, div takes the width of a whole line/row
	// equal(oSize.width, 0);
	equal(oSize.height, 0);
	var w = 100;
	var h = 120;
	element.setOuterSize(j.size(w, h));
	oSize = element.getOuterSize();
	equal(oSize.width, w);
	equal(oSize.height, h);
	body.remove(element);
});
});