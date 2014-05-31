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
	// accessing the document body. It seems to be a constructor but in reality, // it is just creating a JavaScript object around the document body element
	// defined in the HTML. see lib/elements/body.js for the body class.
	var b = j.body();
	var leftPanel = j.div('left');
	leftPanel.add(j.h2('left side content'))
			.add(j.div().add(j.img('car.png', '', 60, 40))
						.add(j.textNode('car sale'))
						.addClass('left-level1'))
			.add(j.div().add(j.img('flower.png', '', 60, 40))
						.add(j.textNode('fresh flower'))
						.addClass('left-level1'))
			.add(j.div().add(j.img('go_home.png', '', 60, 40))
						.add(j.textNode('home renovation'))
						.addClass('left-level1'))
			.addClass('left-side-panel');
	var mainPanel = j.div('main');
	mainPanel.add(j.h1('main content'))
				.add(j.textBlock('Watch the super dog cruise! Tickets @TicketMaster for $10 @Door for $12. Showtime: 12am 3am'))
				.add(j.img('SuperDog.gif', '', 300, 300))
				.add(j.textNode('Alien super dog testing out human technology'))
				.addClass('main-panel');
	var rightPanel = j.div('right');
	rightPanel.add(j.div().add(j.img('car.png', '', 60, 40))
							.add(j.textNode('car'))
							.addClass('right-level1'))
				.add(j.div().add(j.img('flower.png', '', 60, 40))
							.add(j.textNode('flower'))
							.addClass('rigth-level2'))
				.add(j.div().add(j.img('go_home.png', '', 60, 40))
							.add(j.textNode('home'))
							.addClass('rigth-level2'))
				.addClass('right-side-panel');
		
	b.add(leftPanel)
		.add(mainPanel)
		.add(rightPanel);
});