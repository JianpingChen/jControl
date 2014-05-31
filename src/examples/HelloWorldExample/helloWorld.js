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
	// construct an h1 element with string 'Hello World!'
	var helloworld = j.h1('Hello World!');
	// Add the h1 element to document body
	b.add(helloworld);
	
	// Because of the fluent style support in jControl library, all of the above
	// can be achieved by one line:
	// j.body().add(j.h1('Hello World!'));
});