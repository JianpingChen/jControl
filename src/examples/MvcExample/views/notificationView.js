define(['jControl'],
function(j)
{
	function notificationView()
	{
		var inner = {};
		inner.notificationTitle = j.textBlock('Notifications');
		inner.notificationTitle.addClass('notificationView-notificationTitle');
		inner.unreadIcon = j.div('notificationView.unreadIcon');
		inner.unreadIcon.addClass('notificationView-unreadIcon');
		inner.unreadCount = j.spanText(0);
		inner.unreadIcon.add(inner.unreadCount);
		
		var outer = j.div('notificationView');
		outer.add(inner.notificationTitle)
			.add(inner.unreadIcon)
			.addClass('notificationView');
			
		outer.getUnreadCount = function()
		{
			return inner.unreadCount;
		};
			
		return outer;
	};
	
	return { create: notificationView };
});