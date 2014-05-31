define(['jControl'],
function(j)
{
	function layoutView()
	{
		var inner = {};
		inner.addViewRow = j.div('layoutView.addViewRow');
		
		inner.chatViewRow = j.div('layoutView.chatViewRow');
		inner.notificationContainer = j.div('layoutView.notificationContainer');
		inner.messageContainer = j.div('layoutView.messageContainer');
		inner.chatViewRow.add(inner.notificationContainer)
						.add(inner.messageContainer)
						.addClass('layoutView-notificationContainer');
						
		inner.allMessageViewRow = j.div('layoutView.allMessageViewRow')
									.addClass('layoutView-messageContainer');
		
		var outer = j.div('layoutView');
		outer.add(inner.addViewRow)
			.add(j.div()
					.add(inner.chatViewRow)
					.add(inner.allMessageViewRow));
			
		outer.getAddViewContainer = function()
		{
			return inner.addViewRow;
		};
		
		outer.getNotificationContainer = function()
		{
			return inner.notificationContainer;
		};
		
		outer.getUnreadMessagesContainer = function()
		{
			return inner.messageContainer;
		};
			
		outer.getAllMessageContainer = function()
		{
			return inner.allMessageViewRow;
		};
		return outer;
	};
	
	return { create: layoutView };
});