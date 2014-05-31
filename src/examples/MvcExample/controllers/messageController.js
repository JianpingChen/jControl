define(['jControl',
		'../views/messageView.js'],
function(j,
		messageView)
{
	function messageController()
	{
		var inner = {};
		inner.onIsReadChanged = function()
		{
			if (inner.msgModel.getPropertyValue('isRead') == true)
				inner.view.removeClass('unread');
		};
		
		var outer = {};
		
		outer.present = function(message)
		{
			inner.view = messageView.create();
			inner.msgModel = message;
			j.bindProperty(inner.view.getFrom(), inner.msgModel, 'from');
			j.bindProperty(inner.view.getSubject(), inner.msgModel, 'subject');
			j.bindProperty(inner.view.getMessageBody(), inner.msgModel, 'body');
			if (inner.msgModel.getPropertyValue('isRead') == false)
				inner.view.addClass('unread');
			inner.msgModel.subscribeToValueChange('isRead', inner.onIsReadChanged);
			
			return inner.view;
		};
		
		return outer;
	};
	
	return { create: messageController };
});