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
	var mouse = j.mouseEventSimulator();
	var body = j.body();
test('a element should have correct tag A', function()
{
	var anchor = j.a();
	equal(anchor.getTagName(), 'A');
});

test('a element has no child on construction', function()
{
	var anchor = j.a();
	equal(anchor.childElements().length, 0);
});

test('can add & remove text node to a element', function()
{
	var anchor = j.a();
	var node = j.textNode('link');
	node.disposeCalled = false;
	var baseDispose = node.dispose;
	node.dispose = function()
	{
		node.disposeCalled = true;
		baseDispose();
	};
	anchor.add(node);
	equal(anchor.childElements().length, 1);
	equal(anchor.numberOfChildren(), 1);
	deepEqual(anchor.getChildElement(0), node);
	
	anchor.remove(node);
	equal(anchor.childElements().length, 0);
	equal(anchor.numberOfChildren(), 0);	
	// remove should not dispose
	ok(!node.disposeCalled);
});

test('a element should call dispose of children in clear ', function(){
	var anchor = j.a();
	var node = j.textNode('link');
	node.disposeCalled = false;
	var baseDispose = node.dispose;
	node.dispose = function()
	{
		node.disposeCalled = true;
		baseDispose();
	};
	anchor.add(node);
	ok(!node.disposeCalled);
	anchor.clear();
	ok(node.disposeCalled);
});

test('a element should notify observer when adding or removing element', function() {
	var anchor = j.a();
	var node = j.textNode('link');
	var observer = j.mockEventListener();
	anchor.subscribeToContentChange(observer.callback);
	anchor.add(node);
	ok(observer.callbackInvoked);
	deepEqual(observer.sender, anchor);
	equal(observer.callbackArg.action, 'add');
	deepEqual(observer.callbackArg.element, node);
	
	observer.reset();
	ok(!observer.callbackInvoked);
	anchor.remove(node);
	deepEqual(observer.sender, anchor);
	equal(observer.callbackArg.action, 'remove');
	deepEqual(observer.callbackArg.element, node);
});

test('a element should notify listener when clicked', function()
{
	// IE doesn't like <a/> being empty
	var anchor = j.a('link');
	var listener = j.mockEventListener();
	anchor.subscribeToClick(listener.callback);
	ok(!listener.callbackInvoked);
	var click = mouse.mouseEvent('click');
	mouse.dispatchEvent(anchor.getHtmlElement(), click);
	ok(listener.callbackInvoked);
	anchor.unsubscribeClick(listener.callback);
});

test('a element should support href', function() {
	var anchor = j.a('link');
	var href = 'www.google.ca';
	anchor.setHref(href);
	var element = anchor.getHtmlElement();
	equal(element.getAttribute('href'), href);
});

test('a element should support rel', function() {
	var anchor = j.a('link');
	var rel = 'home link';
	anchor.setRel(rel);
	var element = anchor.getHtmlElement();
	equal(element.getAttribute('rel'), rel);
});

test('a element should support target', function() {
	var anchor = j.a('link');
	var target = '_blank';
	anchor.setTarget(target);
	var element = anchor.getHtmlElement();
	equal(element.getAttribute('target'), target);
	
	target = '_self';
	anchor.setTarget(target);
	var element = anchor.getHtmlElement();
	equal(element.getAttribute('target'), target);
});

test('a element outer size should always be zero before adding to document', function(){
	var anchor = j.a('link');
	var outerSize = anchor.getOuterSize();
	equal(outerSize.height, 0)
	equal(outerSize.width, 0);
});

// test('a element inline styles added before adding to document is ignored after adding to document', function(){
	// var anchor = j.a('link');
	// var outerSize = anchor.getOuterSize();
	// equal(outerSize.height, 0)
	// equal(outerSize.width, 0);
	// var size = 100;
	// anchor.setOuterSize(j.size(size, size));
	// outerSize = anchor.getOuterSize();
	// equal(outerSize.height, 0)
	// equal(outerSize.width, 0);
	// body.add(anchor);
	// outerSize = anchor.getOuterSize();
	// ok(outerSize.height != size);
	// ok(outerSize.width != size);
	// // depends on browser setting
	// // equal(outerSize.height, 16)
	// // equal(outerSize.width, 22);
// });

// test('a element size is determined by browser once added to document, and inline style has no effect after that', function(){
	// var anchor = j.a('link');
	// var outerSize = anchor.getOuterSize();
	// equal(outerSize.height, 0)
	// equal(outerSize.width, 0);
	// body.add(anchor);
	// // these are IE values
	// // var browserAssignedHeight = 18;
	// // var browserAssignedWidth = 25;
	// // Other browsers think it should be (19, 21)
	// outerSize = anchor.getOuterSize();
	// ok(outerSize.height > 0);
	// ok(outerSize.width > 0);
	// var size = 100;
	// anchor.setOuterSize(j.size(size,size));
	// outerSize = anchor.getOuterSize();
	// ok(outerSize.height != size)
	// ok(outerSize.width != size);
	// ok(outerSize.height > 0);
	// ok(outerSize.width > 0);
	// body.remove(anchor);
// });

});