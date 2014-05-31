define(['jControl'],
function(j)
{
	function messageListView(title)
	{
		var inner = {};
		inner.titleContainer = j.div();
		var title = j.textBlock(title)
						.addClass('messageListView-title');
		inner.titleContainer.add(title);
		
		inner.msgContainer = j.div();
		
		var outer = j.div('messageListView');
		outer.addClass('messageListView');
			
		outer.add(inner.titleContainer)
			.add(inner.msgContainer);
			
		outer.getMessageContainer = function()
		{
			return inner.msgContainer;
		};
		
		return outer;
	};
	
	return { create: messageListView };
});