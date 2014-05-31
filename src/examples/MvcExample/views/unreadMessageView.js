define(['jControl',
		'./messageView.js'],
function(j,
		messageView)
{
	function unreadMessageView()
	{
		var inner = {};
				
		inner.markButton = j.divButton()
								.add(j.spanText('Mark as read'))
								.addClass('unreadMessageView-button');
		inner.deleteButton = j.divButton()
								.add(j.spanText('Delete'))
								.addClass('unreadMessageView-button');
		inner.openButton = j.divButton()
								.add(j.spanText('Open'))
								.addClass('unreadMessageView-button');
		inner.buttonsRow = j.div()
								.add(inner.markButton)
								.add(inner.deleteButton)
								.add(inner.openButton)
								.addClass('unreadMessageView-buttons-row');
		
		var outer = messageView.create();
		outer.getMessageBodyRow().toggleVisible(false);
		outer.add(inner.buttonsRow)
			.addClass('unreadMessageView');
		
		outer.getMarkButton = function()
		{
			return inner.markButton;
		};
		
		outer.getDeleteButton = function()
		{
			return inner.deleteButton;
		};
		
		outer.getOpenButton = function()
		{
			return inner.openButton;
		};
		
		return outer;
	};
	
	return { create: unreadMessageView };
});