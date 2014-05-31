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
require(['../lib/jControl.js',
		'../lib/controls/dialogButtonRow.js'],
function(j, dialogButtonRow) 
{
QUnit.config.reorder = false;

	var body = j.body();
	var skeleton = j.dialogSkeleton(body);
	
test('dialogSkeleton should have drag handle', function(){
	ok(skeleton.dragHandle() != null);
}); 

test('dialogSkeleton should have title row', function(){
	ok(skeleton.getTitleRow() != null);
	ok(skeleton.getTitleRow().hasClass('dialogSkeleton-titleRow'));
}); 

test('dialogSkeleton should have button row', function(){
	ok(skeleton.getButtonRow() != null);
	ok(skeleton.getButtonRow().hasClass('dialogSkeleton-buttonRow'));
}); 

test('dialogSkeleton should have content row', function(){
	ok(skeleton.getContentContainer() != null);
	ok(skeleton.getContentContainer().hasClass('dialogSkeleton-contentRow'));
}); 

test('dialogSkeleton should allow setting title content', function(){
	var title = j.div();
	title.add(j.img('./image.gif', '', 20, 20))
		.add(j.spanText('title'));
	skeleton.setTitleContent(title);
	deepEqual(skeleton.getTitleContent(), title);
});

test('dialogSkeleton should allow setting button row content', function(){
	var buttons = dialogButtonRow.create();
	buttons.addDefaultButtons();
	
	skeleton.setButtonRowContent(buttons);
	deepEqual(skeleton.getButtonRowContent(), buttons);
});

test('dialogSkeleton should adding content', function() {
	var content = j.div();
	content.add(j.img('./bigImage.jpg', '', 300, 400))
			.add(j.textBlock('some text'));
	skeleton.add(content);
	deepEqual(skeleton.getChildElement(0), content);
});

test('dialogSkeleton can be shown and closed', function(){
	var size = j.size(300, 400);
	skeleton.setOuterSize(size);
	ok(skeleton.getBackground() == null);
	skeleton.show();
	var overlay = skeleton.getBackground();
	ok(overlay != null);
	ok(skeleton.getOuterContainer().getZIndex() > overlay.getZIndex());
	ok(overlay.getZIndex() > body.getZIndex());
	var resultSize = skeleton.getOuterSize();
	equal(resultSize.width, size.width);
	equal(resultSize.height, size.height);
	var docSize = j.documentElement().getOuterSize();
	var overlaySize = overlay.getOuterSize();
	equal(overlaySize.width, docSize.width);
	equal(overlaySize.height, docSize.height);
	// TODO: verify layout
	skeleton.close();
});
	skeleton.dispose();
});