define(['jControl'],
function(j)
{
	function messageView()
	{
		var inner = {};
		inner.from = j.spanText();
		inner.from.addClass('messageView-from');
		inner.subject = j.textBlock();
		inner.subject.addClass('messageView-subject');
		inner.messageBody = j.textBlock();
		inner.messageBody.addClass('messageView-messageBody');
		inner.messageBodyRow = 
			j.div('messageView.messageBodyRow').add(j.spanText('Message: ')
							.addClass('messageView-fieldLabel'))
					.add(inner.messageBody);
		
		var outer = j.div('messageView');
		outer.add(j.div().add(j.spanText('From: ')
								.addClass('messageView-fieldLabel'))
						.add(inner.from)
						.add(j.spanText('Subject: ')
								.addClass('messageView-fieldLabel'))
						.add(inner.subject)
						.addClass('messageView-brief-row'))
			.add(inner.messageBodyRow)
			.addClass('messageView');
		
		outer.getFrom = function()
		{
			return inner.from;
		};
		
		outer.getSubject = function()
		{
			return inner.subject;
		};
		
		outer.getMessageBody = function()
		{
			return inner.messageBody;
		};
		
		outer.getMessageBodyRow = function()
		{
			return inner.messageBodyRow;
		};
		
		return outer;
	};
	
	return { create: messageView };
});