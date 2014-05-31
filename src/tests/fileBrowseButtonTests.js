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
	var fInput = j.fileBrowseButton();
	body.add(fInput);
	
test('fileBrowseButton should have class fileBrowseButton', function(){
	ok(fInput.hasClass('fileBrowseButton'));
});

test('fileBrowseButton supports set and get file type', function(){
	var value = 'image';
	fInput.setFileType(value);
	equal(fInput.getFileType(), value);
});

test('fileBrowseButton supports set and get Id', function(){
	var value = 'image';
	fInput.setId(value);
	equal(fInput.getId(), value);
});

test('fileBrowseButton supports set and get formId', function(){
	var value = 'image';
	fInput.setFormId(value);
	equal(fInput.getFormId(), value);
});

test('fileBrowseButton supports set and get Name', function(){
	var value = 'image';
	fInput.setName(value);
	equal(fInput.getName(), value);
});

// test('fileBrowseButton supports set and get value', function(){
	// var value = 'image.gif';
	// fInput.setValue(value);
	// equal(fInput.getValue(), value);
// });

test('fileBrowseButton should allow add img', function(){
	var image = j.img('./image.gif', '', 32, 32).attachData(1);
	fInput.add(image);
	deepEqual(fInput.getChildByData(1), image);
});

test('fileBrowseButton should allow add text', function(){
	var txt = j.textBlock('Browse').attachData(2);
	fInput.add(txt);
	deepEqual(fInput.getChildByData(2), txt);
});

test('fileBrowseButton supports setZIndex', function(){
	var value = 42;
	fInput.setZIndex(value);
	equal(fInput.getZIndex(), value);
	ok(fInput.getFileInput().getZIndex() > value);
});

test('fileBrowseButton supports createFileIcon', function(){
	var icon = fInput.createFileContentIcon();
	ok(icon != null);
});

test('fileBrowseButton removeAll should keep fileInput', function(){	
	fInput.removeAll();
	fInput.exposeSelfAsContainer();
	equal(fInput.numberOfChildren(), 3);
	deepEqual(fInput.getChildElement(0), fInput.getFileInput());
	fInput.exposeChildAsContainer(fInput.getContentContainer());
});

test('fileBrowseButton clear should keep fileInput', function(){
	var txt = j.textBlock('Browse').attachData(2);
	fInput.add(txt);
	fInput.clear();
	fInput.exposeSelfAsContainer();
	equal(fInput.numberOfChildren(), 3);
	deepEqual(fInput.getChildElement(0), fInput.getFileInput());
	fInput.exposeChildAsContainer(fInput.getContentContainer());
});
	body.remove(fInput);
	fInput.dispose();

});