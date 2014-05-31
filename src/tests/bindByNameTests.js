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
require(['../lib/jControl'],
function(j)
{
	function mockDerived(mockDto)
	{
		var inner = {};
		inner.createModel = function(childDto, childInner)
		{
			return mockDerived(childDto, childInner);
		};
		var derivedModel = j.modelBase(mockDto, inner);
		derivedModel.className = 'derivedModel';
		inner.baseSetDto = derivedModel.setPropertyValue;
		derivedModel.setPropertyValue = function(propertyName, value)
		{
			inner.baseSetDto(propertyName, value);
			var target = propName;
			if ((propertyName == target)
				&& (value.length == 0))
			{
				derivedModel.raisePropertyError(target,'str property cannot be empty');
			}
			else
			{
				derivedModel.dismissPropertyError(target);
			}
		};
		return derivedModel;
	};

	var dto = { strValue: 'start value' };
	var propName = 'strValue';
	var host = mockDerived(dto);
	var element = j.textInput();
	var binding = j.bindProperty(element, host, propName);
	element.reset = function()
	{
		element.onErrorCalled = false;
		element.onDismissErrorCalled = false;
		element.onErrorArg = null;
	};
	element.onError = function(arg)
	{
		element.onErrorCalled = true;
		element.onDismissErrorCalled = false;
		element.onErrorArg = arg;
	};
	element.onDismissError = function(arg)
	{
		element.onErrorCalled = false;
		element.onDismissErrorCalled = true;
		element.onErrorArg = null;
	};
		
test('binding: getElement should return the view element', function() {
	deepEqual(binding.getViewElement(), element);
});

test('binding: getModel should return model', function() {
	deepEqual(binding.getModel(), host);
});

test('binding: element should take the host value once bound', function()
{
	deepEqual(element.getValue(), host.getPropertyValue(propName));
});

test('binding: change host value should also change element value', function()
{
	var newValue = 'new message';
	host.setPropertyValue(propName, newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
});

test('binding: change element value should also change host value', function()
{
	var newValue = 'yet another new message';
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
});

test('binding: change element value should also change host value', function()
{
	var newValue = 'yet another new message';
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
});

test('binding: change element value to empty should receive error notification', function()
{
	var newValue = '';
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
	ok(element.onErrorCalled);
	ok(element.onErrorArg != null);
	element.reset();
	newValue = 'not an empty string';
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
	ok(!element.onErrorCalled);
	ok(element.onDismissErrorCalled);
});

test('binding: after element disposing, change host value should not change element value', function()
{
	var newValue = 'message3';
	element.dispose();
	host.setPropertyValue(propName, newValue);
	ok(element.getHtmlElement() == null);
	deepEqual(host.getPropertyValue(propName), newValue);
	element = j.textInput();
});

test('binding: after model disposing, change element value should not change host value', function()
{
	var newValue = 'message4';
	element = j.textInput();
	binding = j.bindProperty(element, host, propName);
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	deepEqual(host.getPropertyValue(propName), newValue);
	
	newValue = 'message5';
	host.dispose();
	element.setValue(newValue);
	deepEqual(element.getValue(), newValue);
	ok(host.getPropertyValue(propName) != newValue);
});
	
});