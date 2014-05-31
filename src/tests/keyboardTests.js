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
	var element = j.div('testDiv').setMinWidth('16').setMinHeight('16');
	var body = j.body().add(element);
	var htmlElement = element.getHtmlElement();
	var simulator = j.keyboardEventSimulator();
	
 test('element should notify attached keyboard handler key down event', function(){
	var type = 'keydown';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
});

test('element should not notify detached keyboard handler key down event', function(){
	var type = 'keydown';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	ok(!keyHandler1.onKeyDownCalled);
	element.attachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
});
	
test('element may have more than one keyboard handlers attached, it should notify all handlers key down event', function() {
	var type = 'keydown';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	var keyHandler2 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	element.attachKeyboardHandler(keyHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
	ok(keyHandler2.onKeyDownCalled);
	ok(!keyHandler2.onKeyPressCalled);
	ok(!keyHandler2.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler2);
 });
 
  test('element should notify attached keyboard handler key press event', function(){
	var type = 'keypress';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
});

test('element should not notify detached keyboard handler key press event', function(){
	var type = 'keypress';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
});
	
test('element may have more than one keyboard handlers attached, it should notify all handlers key press event', function() {
	var type = 'keypress';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	var keyHandler2 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	element.attachKeyboardHandler(keyHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
	ok(!keyHandler2.onKeyDownCalled);
	ok(keyHandler2.onKeyPressCalled);
	ok(!keyHandler2.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler2);
 });
 
  test('element should notify attached keyboard handler key up event', function(){
	var type = 'keyup';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(keyHandler1.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
});

test('element should not notify detached keyboard handler key up event', function(){
	var type = 'keyup';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler1);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(!keyHandler1.onKeyUpCalled);
});
	
test('element may have more than one keyboard handlers attached, it should notify all handlers key up event', function() {
	var type = 'keyup';
	var click = simulator.keyboardEvent(type);
	var keyHandler1 = j.mockKeyboardHandler();
	var keyHandler2 = j.mockKeyboardHandler();
	element.attachKeyboardHandler(keyHandler1);
	element.attachKeyboardHandler(keyHandler2);
	simulator.dispatchEvent(htmlElement, click);
	ok(!keyHandler1.onKeyDownCalled);
	ok(!keyHandler1.onKeyPressCalled);
	ok(keyHandler1.onKeyUpCalled);
	ok(!keyHandler2.onKeyDownCalled);
	ok(!keyHandler2.onKeyPressCalled);
	ok(keyHandler2.onKeyUpCalled);
	element.detachKeyboardHandler(keyHandler1);
	element.detachKeyboardHandler(keyHandler2);
 });

 body.remove(element);
 
});