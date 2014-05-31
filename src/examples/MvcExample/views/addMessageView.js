define(['jControl'],
function(j)
{
	function addMessageView()
	{
		var inner = {};
		inner.friendDropdown = j.select();
		inner.friendDropdown.addClass('addMessageView-friendDropdown');
		inner.subject = j.textInput();
		inner.subject.addClass('addMessageView-subject');
		inner.messageBody = j.textArea();
		inner.messageBody.addClass('addMessageView-messageBody');
		inner.addButton = j.divButton().add(j.spanText('Add')).addClass('addMessageView-addButton');
		
		var outer = j.div('addMessageView');
		outer.add(j.div().add(j.spanText('From: ')
								.addClass('addMessageView-fieldLabel'))
						.add(inner.friendDropdown)
						.add(j.spanText('Subject: ')
								.addClass('addMessageView-fieldLabel'))
						.add(inner.subject))
			.add(j.div().add(j.spanText('Message: ')
									.addClass('addMessageView-fieldLabel'))
						.add(inner.messageBody))
			.add(j.div().add(inner.addButton))
			.addClass('addMessageView');
		
		outer.getFriendDropdown = function()
		{
			return inner.friendDropdown;
		};
		
		outer.getSubject = function()
		{
			return inner.subject;
		};
		
		outer.getMessageBody = function()
		{
			return inner.messageBody;
		};
		
		outer.getAddButton = function()
		{
			return inner.addButton;
		};
		
		return outer;
	};
	
	return { create: addMessageView };
});