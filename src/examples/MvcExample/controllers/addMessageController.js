define(['jControl',
		'../views/addMessageView.js'],
function(j,
		addMessageView)
{
	function addMessageController(friends, messages)
	{
		var inner = {};
		inner.friends = friends;
		inner.messages = messages;
		inner.onAddMessage = function()
		{
			inner.messages.addData(inner.msgModel.getData());
			inner.msgModel.resetData(inner.createNewMessageData());
		};
		
		inner.canAddMessage = function()
		{
			return (inner.msgModel.getPropertyValue('from') != '')
					&& (inner.msgModel.getPropertyValue('subject') != '');
		};
		inner.addCommand = j.command(inner.onAddMessage, inner.canAddMessage);
		
		inner.onFriendSelectionChange = function(sender, arg)
		{
			inner.msgModel.setPropertyValue('subject', arg + ' says hello');
			inner.msgModel.setPropertyValue('body', arg + ' sends a message');
		};
		
		inner.createNewMessageData = function()
		{
			return { "from": '', "subject": '', "body": '', "isRead": false };
		};
		
		inner.onModelChanged = function()
		{
			inner.addCommand.notifyObservers();
		};		
		
		var outer = {};
		outer.present = function()
		{
			if (inner.view != null)
				inner.view.dispose();
			inner.view = addMessageView.create();
			inner.msgModel = j.modelFactory().createModel(inner.createNewMessageData());
			
			var friendsDropdown = inner.view.getFriendDropdown();
			inner.friends.forEach(function(f){
				friendsDropdown.addItem(j.spanText(f), f);
			});
			
			friendsDropdown.subscribeToValueChange(inner.onFriendSelectionChange)
							.selectItem(0);
			
			j.bindProperty(friendsDropdown, inner.msgModel, 'from');
			j.bindProperty(inner.view.getSubject(), inner.msgModel, 'subject');
			j.bindProperty(inner.view.getMessageBody(), inner.msgModel, 'body');
			j.bindButtonCommand(inner.view.getAddButton(), inner.addCommand);
			inner.msgModel.subscribeToModelChange(inner.onModelChanged);
			
			return inner.view;
		};
		
		return outer;
	};
	
	return { create: addMessageController };
});