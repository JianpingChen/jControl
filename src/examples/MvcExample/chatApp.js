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
requirejs.config({
	baseUrl: '../../lib',
    paths: {
        "jControl": 'jControl'
    }
});
// Tell RequireJs to load jControl.js from the configuration
require(['jControl', 
		'./models/chatMessageListModel.js',
		'./views/layoutView.js',
		'./controllers/addMessageController.js',
		'./controllers/notificationController.js',
		'./controllers/unreadMessageListController.js',
		'./controllers/messageListController.js'],
// j is the object returned by jControl.js main function. You can name it anything you want.
function(j,
		chatMessageListModel,
		layoutView,
		addMessageController,
		notificationController,
		unreadMessageListController,
		messageListController) 
{ 
	var layout = layoutView.create();
	j.body().add(layout);
	
	var startMessages = [
		{ "from": 'Bob', "subject": 'Bob says hello', "body": 'Bob created a message', "isRead": true },
		{ "from": 'Mary', "subject": 'Mary says hello', "body": 'Mary created a message', "isRead": false },
		{ "from": 'Jason', "subject": 'Jason says hello', "body": 'Jason created a message', "isRead": false },
		{ "from": 'Linda', "subject": 'Linda says hello', "body": 'Linda created a message', "isRead": true }
	];
	
	var messages = chatMessageListModel.create(startMessages);
	
	var inner = {};
	inner.friends = ['Bob', 'Chelsey', 'Smith', 'Jessica'];	
	
	var addCtrlr = addMessageController.create(inner.friends, messages);
	var addView = addCtrlr.present();
	layout.getAddViewContainer().add(addView);
	
	var notificationCtrlr = notificationController.create();
	var viewNotification = notificationCtrlr.present(messages);
	layout.getNotificationContainer().add(viewNotification);
	
	var unreadMessageCtrlr = unreadMessageListController.create();
	var unreadMessages = unreadMessageCtrlr.present(messages);
	layout.getUnreadMessagesContainer().add(unreadMessages);
	
	var msgCtrlr = messageListController.create();
	var allMessages = msgCtrlr.present(messages);
	layout.getAllMessageContainer().add(allMessages);

});