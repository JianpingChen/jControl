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

	var fileProp = j.fileHandlingModelFactory().createFilePropertyModel();
	
test('filePropertyModel should default to any image file', function(){
	var acceptTypes = fileProp.getAcceptableTypes();
	equal(acceptTypes.numOfModels(), 1);
	var defaultType = acceptTypes.getModel(0);
	deepEqual(defaultType.getContentType(), 'image');
	deepEqual(defaultType.getSubtype(), '*');
});

test('filePropertyModel should have default file key', function(){
	ok(fileProp.getFileKey() != null);
});

test('filePropertyModel should have value model', function(){
	ok(fileProp.getValueModel() != null);
});

test('filePropertyModel should support set and get value', function(){
	ok(fileProp.getValue() == '');
	fileProp.setValue('a.png');
	equal(fileProp.getValue(), 'a.png');
});

});