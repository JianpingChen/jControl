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

	var body = j.body();
	var container = j.div('container');
	container.isAttachedToDomCalled = false;
	var child1 = j.textBlock('a child');
	var testData = 'testData';
	child1.attachData(testData);
	var child2 = j.img('./image.gif', '', '20', '20');
	var baseOnAttachedToDom = container.onAttachedToDom;
	container.onAttachedToDom = function()
	{
		container.isAttachedToDomCalled = true;
		baseOnAttachedToDom();
	};
	var baseOnDetachedFromDom = container.onDetachedFromDom;
	container.onDetachedFromDom = function()
	{
		container.isDetachedFromDomCalled = true;
		baseOnDetachedFromDom();
	};
	var contentChangeListener = j.mockEventListener();

test('Container should allow adding child element', function(){
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	container.add(child1);
	equal(container.childElements().length, 1);
	equal(container.numberOfChildren(), 1);
});

test('Container should allow retrieving child element by index', function(){
	deepEqual(container.getChildElement(0), child1);
});

test('Container should allow retrieving child element by data', function(){
	deepEqual(container.getChildByData(testData), child1);
});
	
test('Container should allow removing child element', function(){
	equal(container.childElements().length, 1);
	equal(container.numberOfChildren(), 1);
	ok(!child1.isDisposed());
	container.remove(child1);
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	ok(!child1.isDisposed());
});

test('Container remove function should remove all children elements', function(){
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	ok(!child1.isDisposed());
	ok(!child2.isDisposed());
	container.add(child1)
			.add(child2);
	equal(container.childElements().length, 2);
	equal(container.numberOfChildren(), 2);
	container.removeAll();
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	ok(!child1.isDisposed());
	ok(!child2.isDisposed());
});

test('Container clear function should remove all children elements and dispose them', function(){
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	ok(!child1.isDisposed());
	ok(!child2.isDisposed());
	container.add(child1)
			.add(child2);
	equal(container.childElements().length, 2);
	equal(container.numberOfChildren(), 2);
	container.clear();
	equal(container.childElements().length, 0);
	equal(container.numberOfChildren(), 0);
	ok(child1.isDisposed());
	ok(child2.isDisposed());
});

	var child3 = j.textInput('a child');	
	var testData = 'testData';
	child1.attachData(testData);
	var child4 = j.img('./image.gif', '', '20', '20');

	
test('container and all children should receive onAttachedToDom call when added to body', function(){
	container.add(child3);
	ok(!child3.isAttachedToDom());
	ok(!container.isAttachedToDomCalled);
	body.add(container);
	ok(container.isAttachedToDomCalled);
	ok(child3.isAttachedToDom());
});

test('container should set all children form attribute when form id is set', function(){
	var formId = 'testContainerFormId';
	container.setFormId(formId);
	equal(child3.getAttributeValue('form'), formId);
});

test('container should set all children zIndex attribute when zIndex is set', function(){
	var zIndex = 123;
	container.setZIndex(zIndex);
	equal(container.getZIndex(), zIndex);
	equal(child3.getZIndex(), zIndex);
});
	
test('Container should allow adding contentChanged event listener', function(){
	equal(container.numberOfContentChangedListeners(), 0);
	container.subscribeToContentChange(contentChangeListener.callback);
	equal(container.numberOfContentChangedListeners(), 1);
});

test('Container should notify contentChanged event and visibleSizeChanged listener when element is added', function(){
	var visibleSizeListener = j.mockEventListener();
	container.subscribeToVisibleSizeChange(visibleSizeListener.callback);
	
	ok(!contentChangeListener.callbackInvoked);
	ok(!visibleSizeListener.callbackInvoked);
	container.add(child4);
	ok(contentChangeListener.callbackInvoked);
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(contentChangeListener.sender, container);
	deepEqual(contentChangeListener.callbackArg, { action: 'add', element: child4 });
	deepEqual(visibleSizeListener.sender, container);
	container.unsubscribeVisibleSizeChange(visibleSizeListener.callback);
});

test('Container should notify contentChanged event and visibleSizeChanged listener when element is removed', function(){
	var visibleSizeListener = j.mockEventListener();
	container.subscribeToVisibleSizeChange(visibleSizeListener.callback);
	
	contentChangeListener.reset();
	ok(!contentChangeListener.callbackInvoked);
	ok(!visibleSizeListener.callbackInvoked);
	container.remove(child4);
	ok(contentChangeListener.callbackInvoked);
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(contentChangeListener.sender, container);
	deepEqual(contentChangeListener.callbackArg, { action: 'remove', element: child4 });
	deepEqual(visibleSizeListener.sender, container);
	ok(!child4.isAttachedToDom());
	container.unsubscribeVisibleSizeChange(visibleSizeListener.callback);
});

test('Container should notify contentChanged event listener when elements are cleared', function(){
	contentChangeListener.reset();
	ok(!contentChangeListener.callbackInvoked);
	container.clear();
	ok(contentChangeListener.callbackInvoked);
	deepEqual(contentChangeListener.sender, container);
	deepEqual(contentChangeListener.callbackArg, { action: 'clear', element: container });
	ok(!child3.isAttachedToDom());
});
	
test('Container should support unsubscribeContentChange', function(){
	equal(container.numberOfContentChangedListeners(), 1);
	container.unsubscribeContentChange(contentChangeListener.callback);
	equal(container.numberOfContentChangedListeners(), 0);
});

	var child5 = j.fileInput();
	
test('Container getFileInputElements should return array of file inputs', function() {
	container.add(child5);
	var fileInputs = container.getFileInputElements();
	ok(fileInputs.length == 1);
	deepEqual(fileInputs[0], child5);
});

test('Container containsHtmlElement should return true for its html element', function() {
	ok(container.containsHtmlElement(container.getHtmlElement()));
});

test('Container containsHtmlElement should return true for its child html element', function() {
	ok(container.containsHtmlElement(child5.getHtmlElement()));
});

test('container and all children should receive onDetachedFromDom call when removed from body', function(){
	ok(child5.isAttachedToDom());
	body.remove(container);
	ok(container.isDetachedFromDomCalled);
	ok(!child5.isAttachedToDom());
});

test('Container should raise visible size change event when a child changes its visibility', function(){
	var visibleSizeListener = j.mockEventListener();
	container.subscribeToVisibleSizeChange(visibleSizeListener.callback);
	var src = container.getChildElement(0);
	src.toggleVisible(false);
	
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(visibleSizeListener.sender, container);
	ok(!visibleSizeListener.callbackArg.isVisible);
	deepEqual(visibleSizeListener.callbackArg.source, src);
	visibleSizeListener.reset();
	
	src.toggleVisible(true);
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(visibleSizeListener.sender, container);
	ok(visibleSizeListener.callbackArg.isVisible);
	deepEqual(visibleSizeListener.callbackArg.source, src);
	
	container.unsubscribeVisibleSizeChange(visibleSizeListener.callback);
	visibleSizeListener.reset();
	src.toggleVisible();
	ok(!visibleSizeListener.callbackInvoked);
	src.toggleVisible(true);	
});

test('Container deleteAt function should also dispose child', function(){
	var child5 = j.textInput('a child');	
	container.add(child5);
	ok(!child5.isDisposed());
	
	container.deleteAt(container.numberOfChildren()-1);
	ok(child5.isDisposed());
});

test('Container deleteElement function should also dispose child', function(){
	var child5 = j.textInput('a child');	
	container.add(child5);
	ok(!child5.isDisposed());
	
	container.deleteElement(child5);
	ok(child5.isDisposed());
});

test('Container dispose function should also dispose children', function(){
	container.add(child4);
	ok(!container.isDisposed());
	ok(!child4.isDisposed());
	body.remove(container);
	container.dispose();
	ok(container.isDisposed());
	ok(child4.isDisposed());
});

});