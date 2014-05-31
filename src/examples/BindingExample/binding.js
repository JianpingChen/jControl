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
	// This is the data we are about to change
	var data = { "str": 'Hello World!' };
	// construct a model from the JSON data object for binding
	var model = j.modelBase(data);
	// construct a text input element
	var helloworld = j.textInput();
	// bind the text input with model's property named 'str'. The same name
	// as in the data object.
	j.bindProperty(helloworld, model, 'str');
	// To make it interesting, we add a text area
	var userInput = j.textArea();
	// also bind the text area to the same property of the model
	j.bindProperty(userInput, model, 'str');
	// Add the elements to document body
	j.body().add(helloworld)
		.add(j.br()) // add a br in between
		.add(userInput);
	// now changes in one input will be reflected in the other as soon as
	// the changing element lost its focus.
});