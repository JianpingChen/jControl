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
	var id = 'testTarget';
	var baseWidth = 120;
	var baseHeight = 150;
	var element = j.div('target')
		.add(j.textBlock('some text before image'))
		.add(j.img('./image.gif', '', 200, 300));
	element.setId(id);
	body.add(element);
	var margin = 7;
	var padding = 3;
	var border = 2;
	var outline = "#0000FF dotted thin";
	var scroll;
	var client;
	var offset;
	var outer;
	var inner;
	var jWidth;
	var jHeight;
	
function matchNumber(n1, n2)
{
	return Math.abs(n1 - n2) < 0.5;
};

test('Div outer size should match jQuery when there is no style', function(){
	outer = element.getOuterSize();
	jWidth = $('#'+id).outerWidth();
	jHeight = $('#'+id).outerHeight();
	ok(matchNumber(outer.width, jWidth));
	ok(matchNumber(outer.height, jHeight));
});

test('Div outer size should match jQuery when display inline', function(){
	element.setDisplay('inline');
	outer = element.getOuterSize();
	jWidth = $('#'+id).outerWidth();
	jHeight = $('#'+id).outerHeight();
	ok(matchNumber(outer.width, jWidth));
	ok(matchNumber(outer.height, jHeight));
});

test('Div outer size should match jQuery when display block', function(){
	element.setDisplay('block');
	outer = element.getOuterSize();
	jWidth = $('#'+id).outerWidth();
	jHeight = $('#'+id).outerHeight();
	ok(matchNumber(outer.width, jWidth));
	ok(matchNumber(outer.height, jHeight));
});

test('Div outer size should match jQuery when display inline-block', function(){
	element.setDisplay('inline-block');
	outer = element.getOuterSize();
	jWidth = $('#'+id).outerWidth();
	jHeight = $('#'+id).outerHeight();
	ok(matchNumber(outer.width, jWidth));
	ok(matchNumber(outer.height, jHeight));
});
	
test('div outer size should match jQuery regardless of display, overflow, inline size, padding, border, margin, outline', function(){
	var displayOptions = ['inline', 'block', 'inline-block'];
	var overflowOptions = ['visible', 'hidden', 'scroll', 'auto'];
	var setSize = [false, true];
	var hasPadding = [false, true];
	var hasBorder = [false, true];
	var hasMargin = [false, true];
	var hasOutline = [false, true];
	for(var i1 = 0; i1 < hasOutline.length; i1++)
	{
		if (hasOutline[i1])
			element.setOutline(outline);
		else
			element.setOutline('');
		for(var i2 = 0; i2 < hasMargin.length; i2++)
		{
			if (hasMargin[i2])
				element.marginAll(''+margin+'px');
			else
				element.marginAll('');
			for(var i3 = 0; i3 < hasBorder.length; i3++)
			{
				if(hasBorder[i3])
					element.borderAll(''+border+'px','blue', 'solid');
				else
					element.borderAll('', '', '');
				for(var i4 = 0; i4 < hasPadding.length; i4++)
				{
					if (hasPadding[i4])
						element.paddingAll(''+padding+'px');
					else
						element.paddingAll('');
					for(var i5 = 0; i5 < setSize.length; i5++)
					{
						if (setSize[i5])
						{
							element.setInnerSize(j.size(baseWidth, baseHeight));
						}
						else
						{
							element.setWidthNull().setHeightNull();
						}
						for(var i6 = 0; i6 < overflowOptions.length; i6++)
						{
							element.setOverflow(overflowOptions[i6]);
							for(var i7 = 0; i7 < displayOptions.length; i7++)
							{
								element.setDisplay(displayOptions[i7]);
								outer = element.getOuterSize();
								jWidth = $('#'+id).outerWidth(true);
								jHeight = $('#'+id).outerHeight(true);
								equal(outer.width, jWidth);
								equal(outer.height, jHeight);
							}
						}
					}
				}
			}
		}
	}
});

body.remove(element);
element.dispose();

});