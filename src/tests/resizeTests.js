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
		'./resizeEventSimulator'],
function(j, resizeEventSimulator) 
{
	var element = j.div('testDiv').add(j.textBlock('io')).setMinWidth(16).setMinHeight('16');
	var body = j.body().add(element);
	var htmlElement = element.getHtmlElement();
	var resizeHandler = j.mockResizeHandler();
	var simulator = resizeEventSimulator.create();
	
test("resize test", function(){
	element.subscribeToSizeChange(resizeHandler.onTargetSizeChaged);
	var resize = simulator.resizeEvent();
	simulator.dispatchEvent(htmlElement, resize);
	ok(resizeHandler.isSizeChangeCalled, 'must call listener');
	deepEqual(resizeHandler.sender, element);
	deepEqual(resizeHandler.listener, resizeHandler);
	element.unsubscribeSizeChange(resizeHandler.onTargetSizeChaged);
	resizeHandler.reset();
	simulator.dispatchEvent(htmlElement, resize);
	ok(!resizeHandler.isSizeChangeCalled);
	equal(resizeHandler.sender, null);
	equal(resizeHandler.listener, null);
});

body.remove(element);

});