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
	var mockDto = { str: 'string value',
						boolVal: true,
					  intVal: 42,
					  floatVal: 3.5,
					  dateVal: new Date() };
	var model = j.modelBase(mockDto, j.modelFactory());
	var propChangeListener = j.mockEventListener();
	var modelChangeListener = j.mockEventListener();
	model.subscribeToModelChange(modelChangeListener.callback);
	
	function mockDerived(mockDto, factory)
	{
		var inner = factory || j.modelFactory();
		inner.createModel = function(childDto, childInner)
		{
			return mockDerived(childDto, childInner);
		};
		var derivedModel = j.modelBase(mockDto, inner);
		derivedModel.className = 'derivedModel';
		inner.baseSetPropertyValue = derivedModel.setPropertyValue;
		derivedModel.setPropertyValue = function(propertyName, value)
		{
			inner.baseSetPropertyValue(propertyName, value);
			var target = 'str';
			if ((propertyName == target)
				&& (value.length == 0))
			{
				derivedModel.raisePropertyError(target, 
											'str property cannot be empty');
			}
			else
			{
				derivedModel.dismissPropertyError(target);
			}
		};
		return derivedModel;
	};

test('modelBase should support getPropertyNames', function() {
	var names = model.getPropertyNames(false);
	equal(names.length, 5);
	ok(names.contains('str'));
	ok(names.contains('boolVal'));
	ok(names.contains('intVal'));
	ok(names.contains('floatVal'));
	ok(names.contains('dateVal'));
});

test('modelBase should support subscribeToValueChange and notify property change to subscriber', function() {
	var prop = 'str';
	model.subscribeToValueChange(prop, propChangeListener.callback);
	modelChangeListener.reset();
	equal(model.getLocalizedPropertyLabel(prop), prop);
	var strNew = 'modified string value';
	model.setPropertyValue(prop, strNew);
	ok(propChangeListener.callbackInvoked);
	deepEqual(propChangeListener.sender, model);
	equal(propChangeListener.callbackArg.value, strNew);
	equal(propChangeListener.callbackArg.propertyName, prop);
	ok(modelChangeListener.callbackInvoked);
	deepEqual(modelChangeListener.callbackArg.source, model);
	equal(modelChangeListener.callbackArg.value, strNew);
	equal(modelChangeListener.callbackArg.propertyName, prop);

	model.unsubscribeValueChange(prop, propChangeListener.callback);
	deepEqual(model.getPropertyValue(prop), strNew);
	
	prop = 'boolVal';
	model.subscribeToValueChange(prop, propChangeListener.callback);
	propChangeListener.reset();
	var boolNew = false;
	model.setPropertyValue(prop, boolNew);
	ok(propChangeListener.callbackInvoked);
	deepEqual(propChangeListener.sender, model);
	equal(propChangeListener.callbackArg.value, boolNew);
	equal(propChangeListener.callbackArg.propertyName, prop);

	model.unsubscribeValueChange(prop, propChangeListener.callback);
	deepEqual(model.getPropertyValue(prop), boolNew);
	
	prop = 'intVal';
	model.subscribeToValueChange(prop, propChangeListener.callback);
	propChangeListener.reset();
	var intNew = 35;
	model.setPropertyValue(prop, intNew);
	ok(propChangeListener.callbackInvoked);
	deepEqual(propChangeListener.sender, model);
	equal(propChangeListener.callbackArg.value, intNew);
	equal(propChangeListener.callbackArg.propertyName, prop);

	model.unsubscribeValueChange(prop, propChangeListener.callback);
	deepEqual(model.getPropertyValue(prop), intNew);
	
	prop = 'floatVal';
	model.subscribeToValueChange(prop, propChangeListener.callback);
	propChangeListener.reset();
	var floatNew = 11.3;
	model.setPropertyValue(prop, floatNew);
	ok(propChangeListener.callbackInvoked);
	deepEqual(propChangeListener.sender, model);
	equal(propChangeListener.callbackArg.value, floatNew);
	equal(propChangeListener.callbackArg.propertyName, prop);

	model.unsubscribeValueChange(prop, propChangeListener.callback);
	deepEqual(model.getPropertyValue(prop), floatNew);
	
	prop = 'dateVal';
	model.subscribeToValueChange(prop, propChangeListener.callback);
	propChangeListener.reset();
	var dateNew = new Date(1987, 2, 21);
	model.setPropertyValue(prop, dateNew);
	ok(propChangeListener.callbackInvoked);
	deepEqual(propChangeListener.sender, model);
	equal(propChangeListener.callbackArg.value, dateNew);
	equal(propChangeListener.callbackArg.propertyName, prop);

	model.unsubscribeValueChange(prop, propChangeListener.callback);
	deepEqual(model.getPropertyValue(prop), dateNew);
	
	prop = 'intVal';
	propChangeListener.reset();
	intNew = 42;
	model.setPropertyValue(prop, intNew);
	ok(!propChangeListener.callbackInvoked);
});

test('Derived class of modelBase can raise error', function(){
	
	var prop = 'str';
	var derived = mockDerived(mockDto, j.modelFactory());
	var errorListener = j.mockEventListener();
	var dismissErrorListener = j.mockEventListener();
	derived.subscribeToError(prop, errorListener.callback, dismissErrorListener.callback);
	
	derived.setPropertyValue(prop, '');
	ok(errorListener.callbackInvoked);
	ok(!dismissErrorListener.callbackInvoked);
	errorListener.reset();
	dismissErrorListener.reset();
	derived.setPropertyValue(prop, 'something different');
	ok(!errorListener.callbackInvoked);
	ok(dismissErrorListener.callbackInvoked);
	
	derived.unsubscribeError(prop, errorListener.callback, dismissErrorListener.callback);
	errorListener.reset();
	dismissErrorListener.reset();
	derived.setPropertyValue(prop, '');
	ok(!errorListener.callbackInvoked);
	ok(!dismissErrorListener.callbackInvoked);
});

test('modelBase can be disposed in which case all listeners are no longer notified', function(){
	var disposable = mockDerived(mockDto, j.modelFactory());
	var propListener = j.mockEventListener();
	var errorListener = j.mockEventListener();
	var dismissErrorListener = j.mockEventListener();
	var prop = 'str';
	disposable.setPropertyValue(prop, 'original');
	disposable.subscribeToValueChange(prop, propListener.callback);
	disposable.subscribeToError(prop, errorListener.callback, dismissErrorListener.callback);
	disposable.setPropertyValue(prop, '');
	ok(propListener.callbackInvoked);
	ok(errorListener.callbackInvoked);
	propListener.reset();
	errorListener.reset();
	dismissErrorListener.reset();
	disposable.setPropertyValue(prop, 'anything');
	ok(propListener.callbackInvoked);
	ok(!errorListener.callbackInvoked);
	ok(dismissErrorListener.callbackInvoked);
	propListener.reset();
	errorListener.reset();
	dismissErrorListener.reset();
	disposable.dispose();
	disposable.setPropertyValue(prop, '');
	ok(!propListener.callbackInvoked);
	ok(!errorListener.callbackInvoked);
	ok(!dismissErrorListener.callbackInvoked);
});

test('modelBase should return nested object by name', function(){
	var nestedDto = { parentStr: 'parentStr',
					child: mockDto };
	var nestingName = 'child';
	var nesting = j.modelBase(nestedDto, j.modelFactory());
	var names = nesting.getChildNames();
	equal(names.length, 1);
	ok(names.contains(nestingName));
	
	var nested = nesting.getChildModel(nestingName);
	
	names = nested.getPropertyNames();
	ok(names.contains('str'));
	ok(names.contains('boolVal'));
	ok(names.contains('intVal'));
	ok(names.contains('floatVal'));
	ok(names.contains('dateVal'));	
	equal(names.length, 5);
	
});

test('modelBase with nested child should support subscribeToValueChange and notify property change to subscriber', function() {
	var nestedDto = { parentStr: 'parentStr',
					child: mockDto };
	var nestingName = 'child';
	var nesting = j.modelBase(nestedDto, j.modelFactory());
	var nested = nesting.getChildModel(nestingName);
	
	var valueListener = j.mockEventListener();
	modelChangeListener.reset();
	nesting.subscribeToModelChange(modelChangeListener.callback);
	
	var prop = 'str';
	nested.subscribeToValueChange(prop, valueListener.callback);
	equal(nested.getLocalizedPropertyLabel(prop), prop.split('.').last());
	var strNew = 'modified string value';
	nested.setPropertyValue(prop, strNew);
	ok(valueListener.callbackInvoked);
	deepEqual(valueListener.sender, nested);
	equal(valueListener.callbackArg.value, strNew);
	ok(modelChangeListener.callbackInvoked);
	deepEqual(modelChangeListener.callbackArg.source, nested);
	equal(modelChangeListener.callbackArg.value, strNew);
	equal(modelChangeListener.callbackArg.propertyName, prop);

	nested.unsubscribeValueChange(prop, valueListener.callback);
	deepEqual(nested.getPropertyValue(prop), strNew);
	
	prop = 'boolVal';
	nested.setPropertyValue(prop, true);
	nested.subscribeToValueChange(prop, valueListener.callback);
	valueListener.reset();
	var boolNew = false;
	nested.setPropertyValue(prop, boolNew);
	ok(valueListener.callbackInvoked);
	deepEqual(valueListener.sender, nested);
	equal(valueListener.callbackArg.value, boolNew);
	
	nested.unsubscribeValueChange(prop, valueListener.callback);
	deepEqual(nested.getPropertyValue(prop), boolNew);
	
	prop = 'intVal';
	nested.subscribeToValueChange(prop, valueListener.callback);
	valueListener.reset();
	var intNew = 35;
	nested.setPropertyValue(prop, intNew);
	ok(valueListener.callbackInvoked);
	deepEqual(valueListener.sender, nested);
	equal(valueListener.callbackArg.value, intNew);
	
	nested.unsubscribeValueChange(prop, valueListener.callback);
	deepEqual(nested.getPropertyValue(prop), intNew);
	
	prop = 'floatVal';
	nested.subscribeToValueChange(prop, valueListener.callback);
	valueListener.reset();
	var floatNew = 56.78;
	nested.setPropertyValue(prop, floatNew);
	ok(valueListener.callbackInvoked);
	deepEqual(valueListener.sender, nested);
	equal(valueListener.callbackArg.value, floatNew);
	
	nested.unsubscribeValueChange(prop, valueListener.callback);
	deepEqual(nested.getPropertyValue(prop), floatNew);
	
	prop = 'dateVal';
	nested.subscribeToValueChange(prop, valueListener.callback);
	valueListener.reset();
	var dateNew = new Date(1976, 2, 21);
	nested.setPropertyValue(prop, dateNew);
	ok(valueListener.callbackInvoked);
	deepEqual(valueListener.sender, nested);
	equal(valueListener.callbackArg.value, dateNew);
	
	nested.unsubscribeValueChange(prop, valueListener.callback);
	deepEqual(nested.getPropertyValue(prop), dateNew);
	
	nested.dispose();
});

test('modelBase with nested child should allow access to child model by name', function(){
	var nestedDto = { parentStr: 'parentStr',
					child: mockDto };
	var nestingName = 'child';
	var nested = j.modelBase(nestedDto, j.modelFactory());
	var childModel = nested.getChildModel(nestingName);
	ok(childModel != null);
	equal(childModel.getPropertyValue('str'), mockDto.str);
	equal(childModel.getPropertyValue('boolVal'), mockDto.boolVal);
	equal(childModel.getPropertyValue('intVal'), mockDto.intVal);
	equal(childModel.getPropertyValue('floatVal'), mockDto.floatVal);
	equal(childModel.getPropertyValue('dateVal'), mockDto.dateVal);
});

test('model base should support clone', function(){
	var nestedDto = { parentStr: 'parentStr',
					child: mockDto };
	var nestingName = 'child';
	var nesting = j.modelBase(nestedDto, j.modelFactory());
	var cloned = nesting.clone();
	var names = cloned.getChildNames();
	equal(names.length, 1);
	ok(names.contains(nestingName));
	names = cloned.getPropertyNames();
	equal(names.length, 1);
	ok(names.contains('parentStr'));
	
	var nested = cloned.getChildModel(nestingName);
	
	names = nested.getPropertyNames();
	ok(names.contains('str'));
	ok(names.contains('boolVal'));
	ok(names.contains('intVal'));
	ok(names.contains('floatVal'));
	ok(names.contains('dateVal'));	
	equal(names.length, 5);
	
	equal(nesting.className, cloned.className, 'class name must match');
	for(var key in mockDto)
	{
		deepEqual(nested.getPropertyValue(key), mockDto[key], key + ' should equal');
	}
});

test('modelBase getCollectionNames should return property names of nested array', function(){
	var mockDto2 = { str: 'second string value',
						boolVal: true,
					  intVal: 55,
					  floatVal: 3.14159,
					  dateVal: new Date(1926, 12, 12) };
	var nestedDto = { parentStr: 'parentStr',
					array: [ mockDto, mockDto2 ] };
	var nestingName = 'array';
	var nested = j.modelBase(nestedDto, j.modelFactory());
	var names = nested.getPropertyNames();
	equal(names.length, 1);
	ok(names.contains('parentStr'));
	
	names = nested.getCollectionNames();
	equal(names.length, 1);
	ok(names.contains(nestingName));

	modelChangeListener.reset();
	nested.subscribeToModelChange(modelChangeListener.callback);
	var collection = nested.getCollectionModel('array');
	var child = collection.getModel(1);
	child.setPropertyValue('intVal', 33);
	ok(modelChangeListener.callbackInvoked);
	deepEqual(modelChangeListener.callbackArg.source, child);
	equal(modelChangeListener.callbackArg.propertyName, 'intVal');
	equal(modelChangeListener.callbackArg.value, 33);	
});

test('modelBase clone function should clone all properties', function(){
	var cloned = model.clone();
	equal(cloned.className, model.className, 'class name must match');
	for(var key in mockDto)
	{
		deepEqual(cloned.getPropertyValue(key), model.getPropertyValue(key), key + ' should equal');
	}
});

test('modelBase clone function should clone nested array', function(){
	var mockDto2 = { str: 'second string value',
						boolVal: true,
					  intVal: 55,
					  floatVal: 3.14159,
					  dateVal: new Date(1926, 12, 12) };
	var nestedDto = { parentStr: 'parentStr',
					array: [ mockDto, mockDto2 ] };
	var nestingName = 'array';
	var nested = j.modelBase(nestedDto, j.modelFactory());
	var cloned = nested.clone();
	var names = cloned.getPropertyNames();
	equal(names.length, 1);
	ok(names.contains('parentStr'));
	
	names = cloned.getCollectionNames();
	equal(names.length, 1);
	ok(names.contains(nestingName));
	
	var collection = cloned.getCollectionModel(nestingName);
	ok(collection != null);
	equal(collection.numOfModels(), 2);
});

test('modelBase should support resetData function', function(){
	var mockDto1 = { str: 'first string value',
						boolVal: false,
					  intVal: 22,
					  floatVal: 1.41427,
					  dateVal: new Date(1962, 1, 2) };
	var mockDto2 = { str2: 'second string value',
						boolVal: true,
					  intVal2: 55,
					  floatVal: 3.14159,
					  dateVal: new Date(1926, 12, 12) };
	var resetable = j.modelBase(mockDto1);
	names = resetable.getPropertyNames();
	ok(names.contains('str'));
	ok(names.contains('boolVal'));
	ok(names.contains('intVal'));
	ok(names.contains('floatVal'));
	ok(names.contains('dateVal'));	
	equal(names.length, 5);
	
	resetable.resetData(mockDto2);
	for(var prop in mockDto2)
	{
		deepEqual(resetable.getPropertyValue(prop), mockDto2[prop], prop + ' must equal');
	}
	names = resetable.getPropertyNames();
	ok(!names.contains('str'));
	ok(!names.contains('intVal'));	
});

test('modelBase resetData function should reset child object', function(){
	var mockDto1 = { str: 'first string value',
						boolVal: false,
					  intVal: 22,
					  floatVal: 1.41427,
					  dateVal: new Date(1962, 1, 2) };
	var mockDto2 = { str2: 'second string value',
						boolVal: true,
					  intVal2: 55,
					  floatVal: 3.14159,
					  dateVal: new Date(1926, 12, 12) };
	var before = { "name": "parent",
					"deletable": { "what": "ever" },
					"child": mockDto1 };
	var resetable = j.modelBase(before, j.modelFactory());
	
	var after = { "name": "parent",
					"notExistBefore": { "after": "all" },
					"child": mockDto2 };
					
	names = resetable.getChildNames();
	ok(names.contains('deletable'));
	ok(names.contains('child'));
	equal(names.length, 2);
	
	resetable.resetData(after);
	names = resetable.getChildNames();
	ok(!names.contains('deletable'));
	ok(names.contains('child'));
	ok(names.contains('notExistBefore'));
	equal(names.length, 2);
	
	var child = resetable.getChildModel('child');
	for(var prop in mockDto2)
	{
		deepEqual(child.getPropertyValue(prop), mockDto2[prop], prop + ' must equal');
	}
});

test('modelBase resetData function should reset child array', function(){
	var mockDto1 = { str: 'first string value',
						boolVal: false,
					  intVal: 22,
					  floatVal: 1.41427,
					  dateVal: new Date(1962, 1, 2) };
	var mockDto2 = { str2: 'second string value',
						boolVal: true,
					  intVal2: 55,
					  floatVal: 3.14159,
					  dateVal: new Date(1926, 12, 12) };
	var before = { "name": "parent",
					"deletable": [{ "what": "ever" }, {"come": "go"}],
					"child": [ mockDto1 ] };
	var resetable = j.modelBase(before, j.modelFactory());
	
	var after = { "name": "parent",
					"notExistBefore": [{ "after": "all" }],
					"child": [ {"xx": "yy"}, mockDto2 ] };
					
	names = resetable.getCollectionNames();
	ok(names.contains('deletable'));
	ok(names.contains('child'));
	equal(names.length, 2);
	
	resetable.resetData(after);
	names = resetable.getCollectionNames();
	ok(!names.contains('deletable'));
	ok(names.contains('child'));
	ok(names.contains('notExistBefore'));
	equal(names.length, 2);
	
	var child = resetable.getCollectionModel('child').getModel(1);
	for(var prop in mockDto2)
	{
		deepEqual(child.getPropertyValue(prop), mockDto2[prop], prop + ' must equal');
	}
});

	model.dispose();
});