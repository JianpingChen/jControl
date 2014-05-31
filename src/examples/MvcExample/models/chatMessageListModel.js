define(['jControl'],
function(j)
{
	function chatMessageListModel(chatMessages)
	{
		var inner = {};
		
		inner.unreadCount = function()
		{
			var count = 0;
			outer.forEach(function(m){
				if (m.getPropertyValue('isRead') === false)
					count++;
			});
			return count;
		};
		
		inner.onCollectionChanged = function(sender, arg)
		{
			if (arg.change == outer.change.add)
			{
				arg.item.subscribeToValueChange('isRead', inner.onMessageRead);
			}
			else if (arg.change == outer.change.remove)
			{
				arg.item.unsubscribeValueChange('isRead', inner.onMessageRead);
			};
			inner.freshUnreadCount();
		};
		
		inner.freshUnreadCount = function()
		{
			outer.raisePropertyChanged('UnreadCount', inner.unreadCount());
		};
		
		inner.onMessageRead = function(sender, arg)
		{
			inner.freshUnreadCount();
		};
		
		var outer = j.modelFactory().createCollectionModel(chatMessages);
		outer.subscribeToCollectionChange(inner.onCollectionChanged);
		outer.forEach(function(message){
			message.subscribeToValueChange('isRead', inner.onMessageRead);
		});
		
		outer.getPropertyValue = function(propName)
		{
			if (propName == 'UnreadCount')
			{
				return inner.unreadCount();
			};
		};
		
		return outer;
	};
	
	return { create: chatMessageListModel };
});