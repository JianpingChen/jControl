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
// Tell RequireJs to load jControl.js from the relative path
require(['../../lib/jControl'],
// j is the object returned by jControl.js main function. You can name it anything you want.
function(j) 
{ 
	// Create a text block to receive the mouse events
	var hoverTarget = j.textBlock('Mouse over this');
	// Add some styling. Use css file if you wish.
	hoverTarget.addClass('hover-target')
			.setDisplay('inline-block')
			.borderAll('1px', 'gold', 'solid')
			.marginAll('4px');
	// Create a popup
	var popFlower = j.popup();
	// Add content
	popFlower.add(j.img('./100_3607.jpg', 'Yellow Rose', 200, 150));
	// Create a mouse handler
	var mouseHandler = {};
	// Add interested events and define what to do
	mouseHandler.onMouseEnter = function() {
		var position = hoverTarget.getScreenPosition();
		position.top += hoverTarget.getOuterSize().height + 2;
		popFlower.showAt(position.left, position.top);
	};
	mouseHandler.onMouseLeave = function() {
		popFlower.close();
	};
	// Attach mouse handler to the target
	hoverTarget.attachMouseHandler(mouseHandler);
	// Add target to document body (not the popup)
	j.body().add(hoverTarget)
			.add(j.textBlock('to see the flower.').setDisplay('inline-block'));
	
});