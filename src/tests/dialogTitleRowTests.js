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
		'../lib/controls/dialogTitleRow.js'],
function(j, dialogTitleRow) 
{
QUnit.config.reorder = false;
	var title = dialogTitleRow.create();
	
test('title row should have class dialogTitleRow', function(){
	ok(title.hasClass('dialogTitleRow'));
});
	
test('title row should have a corner button', function(){
	var cornerButton = title.getCornerButton();
	ok(cornerButton != null);
});

test('title row should have title', function(){
	var titleContainer = title.getTitle();
	ok(titleContainer != null);
});

test('title row can set corner button content', function(){
	var img = j.img('./image.gif', '', 8, 8);
	title.setCornerButtonContent(img);
	ok(title.getCornerButton().containsHtmlElement(img.getHtmlElement()));
});

test('title row can set content', function(){
	var titleContent = j.div();
	titleContent.add(j.img('./image.gif', '', 20, 20))
		.add(j.spanText('title'));
	title.setTitleContent(titleContent);
	deepEqual(title.getTitleContent(), titleContent);
});
	title.dispose();
});
