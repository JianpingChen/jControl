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

	var body = j.body();
	var form = j.form();
	body.add(form);
	var textInit = 'Edit text in form';
	var formElement = form.getHtmlElement();
	var actionValue = '/Server/SaveProduct';
	var defaultEncType = 'multipart/form-data';
	var defaultTarget = '_self';
	var textInput = j.textInput(textInit);
	var intInput = j.intInput();
	var fileInput = j.fileInput();
	
test('By default, form should have method set to "post", enctype set to "multipart/form-data", and should have a default id', function(){
	var element = form.getHtmlElement();
	equal(element.getAttribute('method'), 'post');
	equal(element.getAttribute('enctype'), defaultEncType);
	ok(typeof element.getAttribute('id') != 'undefined');
});

test('form should allow adding hidden input with name and value', function() {
	var id = '12';
	var name = 'textValue';
	var value = 'This is a text';
	form.addHiddenInput(id, name, value);
	var hiddenInput = form.getChildElement(0);
	equal(hiddenInput.getId(), id);
	equal(hiddenInput.getName(), name);
	equal(hiddenInput.getValue(), value);
	equal(hiddenInput.getAttributeValue('type'), 'hidden');
});

test('form should allow adding text input', function(){
	form.addInput(textInput);
	equal(textInput.getFormId(), form.getId());
});

test('form should allow adding integer input', function(){
	form.addInput(intInput);
	equal(intInput.getFormId(), form.getId());
});

test('form should allow adding file input', function(){
	form.addInput(fileInput);
	equal(fileInput.getFormId(), form.getId());
});

test('When element is added to form, formId should be set', function(){
	var d = j.div();
	form.add(d);
	equal(d.getFormId(), form.getId());
});

test('form should allow changing method', function(){
	form.setMethod('get');
	equal(formElement.getAttribute('method'), 'get');
	form.setMethod('post');
	equal(formElement.getAttribute('method'), 'post');
});

test('form should allow changing action', function(){
	ok(formElement.getAttribute('action') == 'undefined');
	form.setAction(actionValue);
	equal(formElement.getAttribute('action'), actionValue);
});

test('form should allow changing enctype', function(){
	equal(formElement.getAttribute('enctype'), defaultEncType);
	form.setEncType('application/x-www-form-urlencoded');
	notEqual(formElement.getAttribute('enctype'), defaultEncType);
	form.setEncType(defaultEncType);
	equal(formElement.getAttribute('enctype'), defaultEncType);
});

test('form should allow changing target', function(){
	equal(formElement.getAttribute('target'), defaultTarget);
	form.setTarget('_blank');
	notEqual(formElement.getAttribute('target'), defaultTarget);
});

test('form has reset function', function(){
	form.reset();
	notEqual(textInput.getValue(), textInit);
});

test('form has submit function', function(){
	ok(typeof formElement.submit != 'undefined');
});

	body.remove(form);
	form.dispose();
});