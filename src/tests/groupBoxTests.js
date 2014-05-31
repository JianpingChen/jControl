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
	
test('fieldset can be created with string label', function() {
	var g = j.fieldset('label');
	ok(g.getLegendContent() != null);
});

test('fieldset can be created with complex label', function() {
	var male = j.div('sexSelect');
	male.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Male'));
		
	var g = j.fieldset(male);
	deepEqual(g.getLegendContent(), male);
	// All browsers seem to be happy to allow this
	//g.add(j.textNode('groupbox content'));
	//body.add(g);
});

test('fieldset dispose must dispose label content', function() {
	var male = j.div('maleSelect');
	male.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Male'));
	male.disposed = false;
	var defaultDispose = male.dispose;
	male.dispose = function()
	{
		male.disposed = true;
		defaultDispose();
	};
	
	var g = j.fieldset(male);
	deepEqual(g.getLegendContent(), male);
	
	g.dispose();
	ok(male.disposed);
});

test('fieldset allows reset label content', function() {
	var male = j.div('maleSelect');
	male.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Male'));
	male.disposed = false;
	var defaultDispose = male.dispose;
	male.dispose = function()
	{
		male.disposed = true;
		defaultDispose();
	};
		
	var female = j.div('femaleSelect');
	female.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Female'));

	var g = j.fieldset(male);
	deepEqual(g.getLegendContent(), male);
	
	g.setLegendContent(female);
	ok(male.disposed);
	deepEqual(g.getLegendContent(), female);
});

test('fieldset remove should not dispose but clear must dispose', function() {
	var g = j.fieldset('label');
	var male = j.div('maleSelect');
	male.add(j.img('./image.gif', '', '20', '20'))
		.add(j.textBlock('Male'));
	male.disposed = false;
	var defaultDispose = male.dispose;
	male.dispose = function()
	{
		male.disposed = true;
		defaultDispose();
	};
	
	var label = g.getLegendContent();
	label.disposed = false;
	var labelDispose = label.dispose;
	label.dispose = function()
	{
		label.disposed = true;
		labelDispose();
	};
	
	g.add(male);
	equal(g.numberOfChildren(), 1);
	equal(g.childElements().length, 1);
	deepEqual(g.getChildElement(0), male);
	deepEqual(g.childElements()[0], male);
	ok(!male.disposed);
	g.remove(male);
	equal(g.numberOfChildren(), 0);
	ok(!male.disposed);
	equal(g.getChildElement(0), null);
	g.add(male);
	ok(!male.disposed);
	equal(g.numberOfChildren(), 1);
	deepEqual(g.getChildElement(0), male);
	ok(!label.disposed);
	g.clear();
	ok(male.disposed);
	ok(!label.disposed);
});

});