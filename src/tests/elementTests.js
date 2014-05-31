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
QUnit.config.reorder = false;
	var element = j.div('testDiv').setMinWidth('16').setMinHeight('16');
	var body = j.body().add(element);
	var id = 'thisId';
	var name = 'myName';
	var htmlElement = element.getHtmlElement();
	var attrName = 'myAttr';
	var attrValue = 'myAttrValue';
	var simulator = j.mouseEventSimulator();

test("element should support set id", function() {
	element.setId(id);
	equal(element.getId(), id);
	equal(htmlElement.getAttribute('id'), id);
	});
	
test("element should support set form id", function() {
	element.setFormId(id);
	equal(element.getFormId(), id);
	equal(htmlElement.getAttribute('form'), id);
});
	
test("element should support enable disable", function() {
	ok(!htmlElement.disabled, 'enabled by default');
	element.toggleEditable(false);
	ok(htmlElement.disabled, 'disabled now');
	element.enable();
	ok(!htmlElement.disabled, 'enabled now');
	element.disable();
	ok(htmlElement.disabled, 'disabled now');
	});
	
test("element should support set name", function() {
	element.setName(name);
	equal(htmlElement.getAttribute('name'), name);
	equal(element.getName(), name);	
});

test("element should support set attribute", function() {
	element.setAttributeValue(attrName, attrValue);
	equal(element.getAttributeValue(attrName), attrValue);
	equal(htmlElement.getAttribute(attrName), attrValue);
});

test("element should support has Attribute", function() {
	ok(element.hasAttribute(attrName));
});

test("element should support remove attribute", function() {
	element.removeAttribute(attrName);
	ok(!element.hasAttribute(attrName));
	equal(element.getAttributeValue(attrName), null);
	equal(htmlElement.getAttribute(attrName), null);
});

test("element should support isVisible", function(){
	ok(element.isVisible());
});

test("element should support toggle visible", function(){
	element.toggleVisible();
	ok(!element.isVisible());
	equal(htmlElement.style.display, 'none');
	element.toggleVisible(false);
	ok(!element.isVisible());
	equal(htmlElement.style.display, 'none');
	element.toggleVisible();
	ok(element.isVisible());
	equal(htmlElement.style.display, 'inline');
	element.toggleVisible(true);
	ok(element.isVisible());
	equal(htmlElement.style.display, 'inline');
	element.toggleVisible(false);
	ok(!element.isVisible());
	equal(htmlElement.style.display, 'none');
	element.toggleVisible();
	ok(element.isVisible());
	equal(htmlElement.style.display, 'inline');
});

test("element should raise visible size change event when visibility toggles", function(){
	var visibleSizeListener = j.mockEventListener();
	element.subscribeToVisibleSizeChange(visibleSizeListener.callback);
	element.toggleVisible(false);
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(visibleSizeListener.sender, element);
	ok(!visibleSizeListener.callbackArg.isVisible);
	deepEqual(visibleSizeListener.callbackArg.source, element);
	visibleSizeListener.reset();
	element.toggleVisible(true);
	ok(visibleSizeListener.callbackInvoked);
	deepEqual(visibleSizeListener.sender, element);
	ok(visibleSizeListener.callbackArg.isVisible);
	deepEqual(visibleSizeListener.callbackArg.source, element);
	
	element.unsubscribeVisibleSizeChange(visibleSizeListener.callback);
	visibleSizeListener.reset();
	element.toggleVisible();
	ok(!visibleSizeListener.callbackInvoked);
	element.toggleVisible();
});

test("element should support toggle hidden", function(){
	ok(!element.isHidden());
	equal(htmlElement.style.visibility, '');
	element.toggleHidden(true);
	ok(element.isHidden());
	equal(htmlElement.style.visibility, 'hidden');
	element.toggleHidden();
	ok(!element.isHidden());
	equal(htmlElement.style.visibility, 'visible');
});

test("element should support add/remove class", function() {
	var c1 = "class1";
	var c2 = "class2";
	element.addClass(c1);
	equal(element.getClasses(), c1);
	equal(htmlElement.getAttribute('class'), c1);
	element.addClass(c2);
	ok(element.getClasses().indexOf(c1)>= 0);
	ok(htmlElement.getAttribute('class').indexOf(c1) >= 0);
	ok(element.getClasses().indexOf(c2)>= 0);
	ok(htmlElement.getAttribute('class').indexOf(c2) >= 0);
	element.removeClass(c1);
	ok(element.getClasses().indexOf(c1) < 0);
	ok(htmlElement.getAttribute('class').indexOf(c1) < 0);
	ok(element.getClasses().indexOf(c2)>= 0);
	ok(htmlElement.getAttribute('class').indexOf(c2) >= 0);
	element.removeClass(c2);
	ok(element.getClasses().indexOf(c1) < 0);
	ok(htmlElement.getAttribute('class').indexOf(c1) < 0);
	ok(element.getClasses().indexOf(c2) < 0);
	ok(htmlElement.getAttribute('class').indexOf(c2) < 0);
});

test('HTML5: element should support toggle dragable', function() {
	ok(!element.isDragable());
	element.toggleDragable();
	ok(element.isDragable());
	element.toggleDragable(true);
	ok(element.isDragable());
	element.toggleDragable(false);
	ok(!element.isDragable());
});

test('element should support containsHtmlElement', function(){
	ok(element.containsHtmlElement(htmlElement));
	var foreign = j.div();
	ok(!element.containsHtmlElement(foreign.getHtmlElement()));
});

body.remove(element);

});