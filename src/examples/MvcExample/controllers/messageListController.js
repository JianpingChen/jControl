define(['jControl',
		'../views/messageListView.js',
		'./messageController.js'],
function(j,
		messageListView,
		messageController)
{
	function messageListController()
	{
		var inner = {};
		
		inner.renderContent = function()
		{
			var msgContainer = inner.view.getMessageContainer();
			msgContainer.clear();
			
			inner.messagesModel.forEach(function(message){
				var msgCtrlr = messageController.create();
				msgContainer.add(msgCtrlr.present(message));				
			});		
		};
		
		inner.onMessagesChanged = function(sender, arg)
		{
			// TODO:  Be smarter here using the function arguments
			inner.renderContent();
		};
		
		var outer = {};
		outer.present = function (messagesModel)
		{
			if (inner.view != null)
				inner.view.dispose();
			inner.view = messageListView.create("All messages");
			if (inner.messagesModel != null)
				inner.messagesModel.unsubscribeModelChange(inner.onMessagesChanged);
			inner.messagesModel = messagesModel;
			inner.messagesModel.subscribeToModelChange(inner.onMessagesChanged);
			
			inner.renderContent();
			
			return inner.view ;
		};
		return outer;
	};
	
	return { create: messageListController };
});