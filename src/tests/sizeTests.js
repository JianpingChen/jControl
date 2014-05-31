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
require(['../lib/jControl.js'],
function(j)
{

QUnit.config.reorder = false;

	var body = j.body();
	var baseWidth = 1200;
	var baseHeight = 2000;
	var element = j.img('./image.gif', '', baseWidth, baseHeight);
	body.add(element);
	var margin = 5;
	var padding = 3;
	var border = 1;
	var scroll;
	var client;
	var offset;
	var outer;
	var inner;
	
// test('anchor inline style size change is ignored by all browsers', function(){
	// var anchor = j.a(j.textBlock('=')
					// .setBackgroundColor('Grey'));
	// body.add(anchor);
	// var initOuter = anchor.getOuterSize();
	// anchor.setOuterSize(j.size(80, 120));
	// var styledOuter = anchor.getOuterSize();
	// // This is ridiculous. Why is anchor so special?
	// // All browsers agreed that inline style for anchor should be ignored
	// equal(initOuter.height, styledOuter.height);
	// equal(initOuter.width, styledOuter.width);
	// body.remove(anchor);
	// anchor.dispose();
// });

test('Without margin, border, or padding, clientSize, offsetSize, outerSize, element.width, element.height should all match', function() {
	scroll = element.getScrollSize();
	client = element.getClientSize();
	offset = element.getOffsetSize();
	outer = element.getOuterSize();
	inner = element.getInnerSize();
	equal(scroll.width, baseWidth);
	equal(scroll.height, baseHeight);
	equal(client.width, baseWidth);
	equal(client.height, baseHeight);
	equal(offset.width, baseWidth);
	equal(offset.height, baseHeight);
	equal(outer.width, baseWidth);
	equal(outer.height, baseHeight);
	equal(offset.width, inner.width);
	equal(offset.height, inner.height);
});
	
test('outerSize should include margin. offsetSize, clientSize, and element.getInnerWidth(), element.getInnerHeight() should not include margin', function() {
	element.marginAll(''+margin+'px');
	scroll = element.getScrollSize();
	client = element.getClientSize();
	offset = element.getOffsetSize();
	outer = element.getOuterSize();
	inner = element.getInnerSize();
	equal(scroll.width, baseWidth);
	equal(scroll.height, baseHeight);
	equal(client.width, baseWidth);
	equal(client.height, baseHeight);
	equal(offset.width, baseWidth);
	equal(offset.height, baseHeight);
	equal(outer.width, baseWidth + 2*margin);
	equal(outer.height, baseHeight + 2*margin);
	equal(inner.width, baseWidth);
	equal(inner.height, baseHeight);
});

test('outerSize should include margin and padding. offsetSize only include padding without margin. element.getInnerWidth() and element.getInnerHeight() will include neither', function() {
	element.paddingAll(''+padding+'px');
	scroll = element.getScrollSize();
	client = element.getClientSize();
	offset = element.getOffsetSize();
	outer = element.getOuterSize();
	inner = element.getInnerSize();
	// In IE, client size doesn't include padding
	// However, Firefox thinks it should and so does Chrome
	// Safari seems to agree with IE. Well, C'est la vie!
	// equal(client.width, baseWidth);
	// equal(client.height, baseHeight);
	// IE thinks scrollSize should not include padding
	// FireFox, Chrome, Safari, and Opera don't agree
	// equal(scroll.width, baseWidth);
	// equal(scroll.height, baseHeight);
	equal(offset.width, baseWidth + 2*padding);
	equal(offset.height, baseHeight + 2*padding);
	equal(outer.width, baseWidth + 2*margin + 2*padding);
	equal(outer.height, baseHeight + 2*margin + 2*padding);
	equal(inner.width, baseWidth);
	equal(inner.height, baseHeight);
});
	
test('outerSize and offsetSize should include border. element.getInnerWidth() and element.getInnerHeight() will not include border', function() {
	element.borderAll(''+border+'px', 'blue', 'solid');
	scroll = element.getScrollSize();
	client = element.getClientSize();
	offset = element.getOffsetSize();
	outer = element.getOuterSize();
	inner = element.getInnerSize();
	// IE thinks scrollSize should not include padding
	// FireFox, Chrome, Safari, and Opera don't agree
	// equal(scroll.width, baseWidth);
	// equal(scroll.height, baseHeight);
	equal(offset.width, baseWidth + 2*padding + 2*border);
	equal(offset.height, baseHeight + 2*padding + 2*border);
	equal(outer.width, baseWidth + 2*margin + 2*padding + 2*border);
	equal(outer.height, baseHeight + 2*margin + 2*padding + 2*border);
	equal(inner.width, baseWidth);
	equal(inner.height, baseHeight);
});
	
test('setInnerWidth and setInnerHeight will only change the values returned by element.getInnerWidth() and element.getInnerHeight(). outerSize will add margin, border, padding to that. offsetSize will only add border and padding to that', function() {
	// Conclusion: only outerSize is sensitive to margin. Any calculation
	// for centering elements must be based on outerSize.
	var styleHeight = 4000;
	var styleWidth = 4200;
	element.setInnerSize(j.size(styleWidth, styleHeight));
	scroll = element.getScrollSize();
	client = element.getClientSize();
	offset = element.getOffsetSize();
	outer = element.getOuterSize();
	inner = element.getInnerSize();
	// IE thinks scrollSize should not include padding
	// FireFox, Chrome, Safari, and Opera don't agree
	// equal(scroll.width, styleWidth);
	// equal(scroll.height, styleHeight);
	equal(offset.width, styleWidth + 2*padding + 2*border);
	equal(offset.height, styleHeight + 2*padding + 2*border);
	// CONCLUSION: Margin can be calculated from outer size and offsetSize.
	// padding + border can be calculated from offset size and getInnerWidth(), getInnerHeight() functions
	equal(outer.width, styleWidth + 2*margin + 2*padding + 2*border);
	equal(outer.height, styleHeight + 2*margin + 2*padding + 2*border);
	equal(inner.width, styleWidth);
	equal(inner.height, styleHeight);
	
	body.remove(element);
	element.dispose();
});

});