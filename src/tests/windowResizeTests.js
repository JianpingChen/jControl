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
	var container = j.div('container');
	var child1 = j.textBlock('a child');
	child1.reset = function()
	{
		child1.windowSize = null;
		child1.windowSizeChangedCalled = false;
	};
	child1.onWindowSizeChanged = function(windowSize)
	{
		child1.windowSize = windowSize;
		child1.windowSizeChangedCalled = true;
	};
	child1.reset();
	
	var child2 = j.img('./image.gif', '', '20', '20');
	child2.reset = function()
	{
		child2.windowSize = null;
		child2.windowSizeChangedCalled = false;
	};
	child2.onWindowSizeChanged = function(windowSize)
	{
		child2.windowSize = windowSize;
		child2.windowSizeChangedCalled = true;
	};
	child2.reset();
	
	container.add(child1)
			.add(child2);
	body.add(container);
	
	var w = j.windowElement();
	var listener = {}
	listener.onSizeChanged = function() {
		body.onWindowSizeChanged(w.getInnerSize());
	}
	var fullScreen = j.size(1024, 768);
	//w.resizeTo(fullScreen);
	var portraitSize = j.size(320, 620);
	var landscapeSize = j.size(620, 320);
	body.subscribeToSizeChange(listener.onSizeChanged);
	
asyncTest('when window change to smaller, application root should notify child of window resize', function(){
	w.resizeTo(portraitSize);
	expect(4);
	setTimeout(function() {
		var wSize = w.getInnerSize();
		ok(child1.windowSizeChangedCalled);
		deepEqual(child1.windowSize, wSize);
		ok(child2.windowSizeChangedCalled);
		deepEqual(child2.windowSize, wSize);
		start();
		// body.remove(container);
		// container.dispose();
	}, 50);
});

// asyncTest('when window full size, application root should notify child of window resize', function(){
	// w.resizeTo(fullScreen);
	// expect(4);
	// setTimeout(function() {
		// var wSize = w.getInnerSize();
		// ok(child1.windowSizeChangedCalled);
		// deepEqual(child1.windowSize, wSize);
		// ok(child2.windowSizeChangedCalled);
		// deepEqual(child2.windowSize, wSize);
		// start();
		// // body.remove(container);
		// // container.dispose();
	// }, 300);
// });

asyncTest('when window change dimension, application root should notify child of window resize', function(){
	w.resizeTo(landscapeSize);
	expect(4);
	setTimeout(function() {
		var wSize = w.getInnerSize();
		ok(child1.windowSizeChangedCalled);
		deepEqual(child1.windowSize, wSize);
		ok(child2.windowSizeChangedCalled);
		deepEqual(child2.windowSize, wSize);
		start();
		body.remove(container);
		container.dispose();
	}, 50);
});

});