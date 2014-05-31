define(['jControl',
		'../views/messageListView.js',
		'./unreadMessageController.js'],
function(j,
		messageListView,
		unreadMessageController)
{
	function unreadMessageListController()
	{
		var inner = {};
		inner.onDelete = function(message)
		{
			inner.messagesModel.deleteModel(message);
		};
		
		inner.deleteCommand = j.command(inner.onDelete);
		
		inner.renderContent = function()
		{
			var msgContainer = inner.view.getMessageContainer();
			msgContainer.clear();
			
			inner.messagesModel.forEach(function(message){
				if (message.getPropertyValue('isRead') == false)
				{
					var msgCtrlr = unreadMessageController.create();
					msgContainer.add(msgCtrlr.present(message, inner.deleteCommand));
				}
			});		
		};
		
		inner.onMessagesChanged = function(sender, arg)
		{
			// TODO: be smarter here using the function arguments
			inner.renderContent();
		};
		
		var outer = {};
		outer.present = function (messagesModel)
		{
			if (inner.view != null)
				inner.view.dispose();
			inner.view = messageListView.create("Unread messages");
			if (inner.messagesModel != null)
				inner.messagesModel.unsubscribeModelChange(inner.onMessagesChanged);
			inner.messagesModel = messagesModel;
			inner.messagesModel.subscribeToModelChange(inner.onMessagesChanged);
			
			inner.renderContent();
			
			return inner.view ;
		};
		return outer;
	};
	
	return { create: unreadMessageListController };
});