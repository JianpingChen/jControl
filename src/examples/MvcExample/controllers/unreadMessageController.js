define(['jControl',
		'../views/unreadMessageView.js',
		'../views/messageView.js'],
function(j,
		unreadMessageView,
		messageView)
{
	function unreadMessageController()
	{
		var inner = {};
		inner.onMark = function()
		{
			inner.msgModel.setPropertyValue('isRead', true);
		};

		inner.onOpen = function()
		{
			var content = messageView.create();
			j.bindProperty(content.getFrom(), inner.msgModel, 'from');
			j.bindProperty(content.getSubject(), inner.msgModel, 'subject');
			j.bindProperty(content.getMessageBody(), inner.msgModel, 'body');
			var dialog = j.modalDialog();
			dialog.okCommand = j.command(function(){});	
			dialog.clear()
					.setTitleContent(j.textBlock('Reading Message'))
					.add(content)
					.show();
			inner.msgModel.setPropertyValue('isRead', true);
		};
		
		var outer = {};
		outer.present = function (messageModel, deleteCommand)
		{
			if (inner.view != null)
				inner.view.dispose();
			inner.view = unreadMessageView.create();
			inner.msgModel = messageModel;
			j.bindProperty(inner.view.getFrom(), inner.msgModel, 'from');
			j.bindProperty(inner.view.getSubject(), inner.msgModel, 'subject');
			j.bindProperty(inner.view.getMessageBody(), inner.msgModel, 'body');
			j.bindButtonCommand(inner.view.getMarkButton(), j.command(inner.onMark));
			j.bindButtonCommand(inner.view.getDeleteButton().attachData(inner.msgModel), deleteCommand);
			j.bindButtonCommand(inner.view.getOpenButton(), j.command(inner.onOpen));
			
			return inner.view;
		};
		return outer;
	};
	
	return { create: unreadMessageController };
});