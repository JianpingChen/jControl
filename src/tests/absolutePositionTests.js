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
	var container = j.div();
	var baseWidth = 20;
	var baseHeight = 20;
	var element = j.img('./image.gif', '', baseWidth, baseHeight);
	container.add(j.textBlock('before text|'))
			.add(element)
			.add(j.textBlock('|after text'));
	body.add(container);
	var margin = 5;
	var padding = 3;
	var border = 1;
	var deltaY = 11;
	var deltaX = 13;
	var initialRelative;
	var initialOffset;
	var initialScreen;
	element.setPositioning('absolute');
	var currentRelative;
	var currentOffset;
	var currentScreen;

test('when absolutely positioned element is moved vertically relativePosition, offsetPosition, and screenPosition should reflect the change', function() {
	initialRelative = element.getRelativePosition();
	initialOffset = element.getOffsetPosition();
	initialScreen = element.getScreenPosition();
	// Both IE and Firefox provide values with rounding difference
	// Not sure whether this is from jQuery or Browser
	equal(Math.round(initialRelative.top), initialOffset.top);
	equal(Math.round(initialRelative.left), initialOffset.left);
	equal(Math.round(initialRelative.top), Math.round(initialScreen.top));
	equal(Math.round(initialRelative.left), Math.round(initialScreen.left));
	equal(initialOffset.top, Math.round(initialScreen.top));
	equal(initialOffset.left, Math.round(initialScreen.left));
	
	element.setTop(initialRelative.top + deltaY);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(Math.round(currentRelative.top - initialRelative.top), deltaY);
	equal(Math.round(currentOffset.top - initialOffset.top), deltaY);
	equal(Math.round(currentScreen.top - initialScreen.top), deltaY);
	equal(currentOffset.top, Math.round(currentScreen.top));
	equal(Math.round(element.getTop()), currentOffset.top);
});
	
test('When absolutely positioned element is moved horizontally, relativePosition, offsetPosition, and screenPosition should reflect the change', function() {
	initialRelative = element.getRelativePosition();
	initialOffset = element.getOffsetPosition();
	initialScreen = element.getScreenPosition();
	element.setLeft(initialRelative.left + deltaX);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(Math.round(currentRelative.left - initialRelative.left), deltaX);
	equal(Math.round(currentOffset.left - initialOffset.left), deltaX);
	equal(Math.round(currentScreen.left - initialScreen.left), deltaX);
	equal(currentOffset.left, Math.round(currentScreen.left));
	equal(Math.round(element.getLeft()), currentOffset.left);
});
	
test('When absolutely position element has margin, relativePosition should include the margin, offsetPosition and screenPosition should ignore margin', function() {
	initialRelative = element.getRelativePosition();
	initialOffset = element.getOffsetPosition();
	initialScreen = element.getScreenPosition();
	element.marginAll(''+margin+'px');
	element.setLeft(currentRelative.left + deltaX);
	element.setTop(currentRelative.top + deltaY);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(Math.round(currentRelative.left - initialRelative.left), deltaX);
	equal(Math.round(currentOffset.left - initialOffset.left), deltaX + margin);
	equal(Math.round(currentScreen.left - initialScreen.left), deltaX + margin);
	equal(Math.round(currentRelative.top - initialRelative.top), deltaY);
	equal(Math.round(currentOffset.top - initialOffset.top), deltaY + margin);
	equal(Math.round(currentScreen.top - initialScreen.top), deltaY + margin);
	equal(currentOffset.top, Math.round(currentScreen.top));
	equal(currentOffset.left, Math.round(currentScreen.left));
	equal(Math.round(element.getLeft()) + margin, currentOffset.left);
	equal(Math.round(element.getTop()) + margin, currentOffset.top);
});
	
test('When absolutely position element has border, relativePosition, offsetPosition and screenPosition should include the border', function() {
	initialRelative = element.getRelativePosition();
	initialOffset = element.getOffsetPosition();
	initialScreen = element.getScreenPosition();
	element.borderAll(''+border+'px', 'blue', 'solid');
	element.setLeft(currentRelative.left + deltaX);
	element.setTop(currentRelative.top + deltaY);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(Math.round(currentRelative.left - initialRelative.left), deltaX);
	equal(Math.round(currentOffset.left - initialOffset.left), deltaX);
	equal(Math.round(currentScreen.left - initialScreen.left), deltaX);
	equal(Math.round(currentRelative.top - initialRelative.top), deltaY);
	equal(Math.round(currentOffset.top - initialOffset.top), deltaY);
	equal(Math.round(currentScreen.top - initialScreen.top), deltaY);
	equal(currentOffset.top, Math.round(currentScreen.top));
	equal(currentOffset.left, Math.round(currentScreen.left));
	equal(Math.round(element.getLeft()) + margin, currentOffset.left);
	equal(Math.round(element.getTop()) + margin, currentOffset.top);
});

test('When absolutely position element has padding, relativePosition, offsetPosition and screenPosition should include the padding', function() {
	initialRelative = element.getRelativePosition();
	initialOffset = element.getOffsetPosition();
	initialScreen = element.getScreenPosition();
	element.paddingAll(''+padding+'px');
	element.setLeft(currentRelative.left + deltaX);
	element.setTop(currentRelative.top + deltaY);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(Math.round(currentRelative.left - initialRelative.left), deltaX);
	equal(Math.round(currentOffset.left - initialOffset.left), deltaX);
	equal(Math.round(currentScreen.left - initialScreen.left), deltaX);
	equal(Math.round(currentRelative.top - initialRelative.top), deltaY);
	equal(Math.round(currentOffset.top - initialOffset.top), deltaY);
	equal(Math.round(currentScreen.top - initialScreen.top), deltaY);
	equal(currentOffset.top, Math.round(currentScreen.top));
	equal(currentOffset.left, Math.round(currentScreen.left));
	equal(Math.round(element.getLeft()) + margin, currentOffset.left);
	equal(Math.round(element.getTop()) + margin, currentOffset.top);
});

test('When absolutely position element is moved to a new position, relativePosition, offsetPosition and screenPosition should reflect the change', function() {
	// Conclusion: offset position is sensitive to margin therefore not suitable for 
	// calculation of moving elements around. In absolute position case, offsetPosition
	// and getScreenPosition behave exactly the same
	var newPosition = j.position(100, 120);
	element.moveToPosition(newPosition);
	currentRelative = element.getRelativePosition();
	currentOffset = element.getOffsetPosition();
	currentScreen = element.getScreenPosition();
	equal(currentRelative.left, newPosition.left);
	equal(currentRelative.top, newPosition.top);
	equal(currentOffset.left, newPosition.left + margin);
	equal(currentOffset.top, newPosition.top + margin);
	equal(currentScreen.left, newPosition.left + margin);
	equal(currentScreen.top, newPosition.top + margin);
	equal(currentOffset.top, Math.round(currentScreen.top));
	equal(currentOffset.left, Math.round(currentScreen.left));
});

body.remove(container);
});