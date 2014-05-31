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
QUnit.config.reorder = false;

	var mockDto1 = { str: 'first string value',
					 boolVal: true,
					 intVal: 236,
					 floatVal: 1.732,
					 dateVal: new Date(1958, 2, 8) };
	var mockDto2 = { str: 'second string value',
					 boolVal: false,
					 intVal: 127,
					 floatVal: 1.414,
					 dateVal: new Date(1935, 12, 18) };
	var mockDto3 = { str: 'third string value',
					 boolVal: false,
					 intVal: 42,
					 floatVal: 3.14159,
					 dateVal: new Date(1975, 11, 18) };
	// var dto = { parentStr: 'parentStr',
					// array: [ mockDto1, mockDto2 ] };
	// var arrProp = 'array';
	// var model = j.modelBase(dto, j.modelFactory());
	var collectionModel = j.modelFactory().createCollectionModel([ mockDto1, mockDto2 ]);	
	var collectionChangeListener = j.mockEventListener();
					
test('collectionModelBase should support numOfModels', function(){
	equal(collectionModel.numOfModels(), 2);
});

test('collectionModelBase should support getModel by index', function(){
	ok(collectionModel.getModel(0) != null);
	ok(collectionModel.getModel(1) != null);
	ok(collectionModel.getModel(2) == undefined);
});

test('collectionModelBase should support clone', function(){
	var clonedCollection = collectionModel.clone();
	equal(clonedCollection.numOfModels(), 2);
	for(var i = 0; i < clonedCollection.numOfModels(); i++)
	{
		var childDto = i == 0 ? mockDto1 : mockDto2;
		var childModel = clonedCollection.getModel(i);
		for(var prop in childDto)
		{
			deepEqual(childModel.getPropertyValue(prop), childDto[prop]);
		}
	};
});

test('collectionModelBase should support removeAt and addData', function(){
	equal(collectionModel.numOfModels(), 2);
	collectionModel.removeAt(1);
	equal(collectionModel.numOfModels(), 1);
	ok(collectionModel.getModel(1) == null);
	var m1 = collectionModel.getModel(0);
	for(var prop in mockDto1)
	{
		deepEqual(m1.getPropertyValue(prop), mockDto1[prop]);
	}
	deepEqual(m1.getData(), mockDto1);
	
	collectionModel.addData(mockDto2);
	equal(collectionModel.numOfModels(), 2);
	var m2 = collectionModel.getModel(1);
	ok(m2 != null);
	ok(collectionModel.getModel(2) == null);
	for(var prop in mockDto2)
	{
		deepEqual(m2.getPropertyValue(prop), mockDto2[prop]);
	}
	deepEqual(m2.getData(), mockDto2);
});

test('collectionModelBase should support remove and addModel', function(){
	var m1 = collectionModel.getModel(0);
	equal(collectionModel.numOfModels(), 2);
	collectionModel.remove(m1);
	equal(collectionModel.numOfModels(), 1);
	ok(collectionModel.getModel(1) == null);
	var m2 = collectionModel.getModel(0);
	for(var prop in mockDto2)
	{
		deepEqual(m2.getPropertyValue(prop), mockDto2[prop]);
	}
	deepEqual(m2.getData(), mockDto2);
	
	collectionModel.addModel(m1);
	equal(collectionModel.numOfModels(), 2);
	m2 = collectionModel.getModel(1);
	ok(m2 != null);
	ok(collectionModel.getModel(2) == null);
	for(var prop in mockDto1)
	{
		deepEqual(m2.getPropertyValue(prop), mockDto1[prop]);
	}
	deepEqual(m2.getData(), mockDto1);
});

test('collectionModelBase should support subscribeToCollectionChange and notify subscribed listeners', function(){
	ok(!collectionChangeListener.callbackInvoked);
	collectionModel.subscribeToCollectionChange(collectionChangeListener.callback);
	var m1 = collectionModel.getModel(0);
	collectionModel.remove(m1);
	ok(collectionChangeListener.callbackInvoked);
	deepEqual(collectionChangeListener.callbackArg.change, 'removed');
	deepEqual(collectionChangeListener.callbackArg.item, m1);
	equal(collectionChangeListener.callbackArg.index, 0);
	
	collectionChangeListener.reset();
	ok(!collectionChangeListener.callbackInvoked);
	collectionModel.addModel(m1);
	ok(collectionChangeListener.callbackInvoked);
	deepEqual(collectionChangeListener.callbackArg.change, 'added');
	deepEqual(collectionChangeListener.callbackArg.item, m1);
	equal(collectionChangeListener.callbackArg.index, 1);
	
	collectionChangeListener.reset();
	collectionModel.unsubscribeCollectionChange(collectionChangeListener.callback);
	ok(!collectionChangeListener.callbackInvoked);
	var m1 = collectionModel.getModel(0);
	collectionModel.remove(m1);
	ok(!collectionChangeListener.callbackInvoked);
	collectionChangeListener.reset();
	collectionModel.addModel(m1);
	ok(!collectionChangeListener.callbackInvoked);
});

test('collectionModelBase should support clone', function(){
	var cloned = collectionModel.clone();
	equal(cloned.numOfModels(), 2);
	for(var i = 0; i < 2; i++)
	{
		var childDto = cloned.getModel(i).getData();
		deepEqual(i == 0 ? mockDto2 : mockDto1, childDto);
	}
	
});

collectionModel.dispose();

});