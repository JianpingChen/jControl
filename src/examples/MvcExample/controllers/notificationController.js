define(['jControl',
		'../views/notificationView.js'],
function(j,
		notificationView)
{
	function notificationController()
	{
		var outer = {};
		outer.present = function (messagesModel)
		{
			var view = notificationView.create();
			j.bindProperty(view.getUnreadCount(), messagesModel, 'UnreadCount');
			
			return view;
		};
		return outer;
	};
	
	return { create: notificationController };
});