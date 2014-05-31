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
	// create a dialog
	var dialog = j.modalDialog();
	// set up title row and its style
	// Without a css file, we'll just set inline styles.
	// Check out scss files in src\tests\Themes folder 
	// to see classes available for dialog styling
	dialog.getTitleRow().setBackgroundColor('gold')
						.borderAll('1px', 'green', 'solid');
	// set up title content and its style
	dialog.setTitleContent(j.textBlock('Dialog Title'))
			// add dialog content. Can be more complicated
			.add(j.textBlock('Hello Dialog'))
			.setOuterWidth(200)
			.setOuterHeight(150)
			.setBackgroundColor('grey');
	// create a textBlock to receive the ok feedback
	var feedback = j.textBlock('');
	// Create a command to define what to do when dialog ok button clicked.
	// In most cases, you don't have to worry about cancel
	dialog.okCommand = j.command(function(){
		feedback.setValue('On OK');
	});	
			
	// create a button. But it's a div. You can style it better than button.
	var button = j.divButton();
	// Add content to the button and add styles
	button.add(j.spanText('Open dialog'))
			.borderAll('1px', 'green', 'solid')
			.paddingAll('4px')
			.setDisplay('inline-block')
			.setBackgroundColor('#C0C0C0');
	// Create a command to define what the button should do when clicked.
	var cmd = j.command(function(){
		feedback.setValue('');
		dialog.show();
	});
	// Bind the button to the command.
	j.bindButtonCommand(button, cmd);
	// Add the button to the body. 
	// Dialog doesn't need to be added since its show and close function will handle itself
	j.body().add(j.spanText('Click the button to open Dialog: '))
		.add(button)
		.add(j.br())
		.add(feedback)
		.add(j.br())
		.add(j.p('Click on dialog title to drag it around.'));
});