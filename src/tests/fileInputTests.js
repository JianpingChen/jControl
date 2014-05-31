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
	var body = j.body();
	var fInput = j.fileInput();
	body.add(fInput);
	var propName = "FileProp";
	var mockFile = j.fileHandlingModelFactory().createFilePropertyModel();
	var mockData = { };
	mockData[propName] = mockFile.getData();
	var mockModel = j.modelBase(mockData, j.modelFactory());
	
test('By default fileInput should have type "file", accept "image/*", no multiple',function(){
	equal(fInput.getAttributeValue('type'), 'file');
	equal(fInput.getAttributeValue('accept'), 'image/*');
	ok(fInput.getAttributeValue('multiple') == null 
		// IE 8
		|| fInput.getAttributeValue('multiple') == '');
});

// test('fileInput can be bound to a filePropertyAccessor', function(){
	// fInput.setAttributeValue('accept', '');
	// equal(fInput.getId(), null);
	// equal(fInput.getName(), null);
	// j.bindFileProperty(fInput, mockModel, propName);
	// equal(fInput.getAttributeValue('accept'), 'image/*');
	// equal(fInput.getId(), mockFile.getChildModel("Value").getPropertyValue("FileKey"));
	// equal(fInput.getName(), mockFile.getChildModel("Value").getPropertyValue("FileKey"));
// });

// Security: fileInput value cannot be set
// test('When fileInput value changes, fileProperty bound should get new value', function(){
	// var path = 'D:\\UserFiles\\Jianping\\Code\\jControl\\js\\tests\\bigImage.jpg';
	// fInput.setValue(path);
	// equal(defaultFileProperty.getFilePath(), path);
	// equal(defaultFileProperty.getFileName(), 'bigImage.jpg');
// });

	body.remove(fInput);
	fInput.dispose();
});