define(['../businessLogic/salesRepAgent',
		'../../myControls',
		'../errorHandling/errorEventArg',
		'./editContactWizardController'],
function (salesRepAgent, j, errorEventArg, editContactWizardController)
{
	function listContactController(doneWithWorkAreaEvent, errorEvent)
	{
		var a = ApplicationStrings;
		var inner = {};
		inner.agent = salesRepAgent.create();
		inner.doneEvent = doneWithWorkAreaEvent;
		inner.errorEvent = errorEvent;
		inner.view = j.div('listContactController.view').addClass('listContactController-view');

		var outer = {};

		inner.onGetContactListFailed = function (errorMessage)
		{
			inner.errorEvent.raiseEvent(outer, errorEventArg.create(errorMessage));
			inner.doneEvent.raiseEvent(outer);
		};

		inner.onEditContact = function (contact)
		{
			var dialog = editContactWizardController.create(inner.agent, inner.errorEvent);
			dialog.edit(contact, inner.view);
		};

		inner.onContactAdded = function (contact)
		{
			inner.tbl.addRow(inner.renderContactRow(contact));
		};

		inner.onContactRemoved = function (contact)
		{
			inner.tbl.removeRowByData(contact);
		};

		inner.onContactsCleared = function (collection)
		{
			inner.tbl.clearRows();
		};

		inner.onModelListChanged = function (sender, collectionChange)
		{
			switch (collectionChange.change)
			{
				case sender.change.add:
					inner.onContactAdded(collectionChange.item);
					break;
				case sender.change.remove:
					inner.onContactRemoved(collectionChange.item);
					break;
				case sender.change.clear:
					inner.onContactsCleared(collectionChange.item);
					break;
			}
		};

		inner.onDeleteSucceeded = function (contact)
		{
			inner.contactListModel.remove(contact);
		};

		inner.onDeleteFailed = function (returnCode, errorMessage)
		{
			inner.errorEvent.raiseEvent(outer, errorEventArg.create(errorMessage));
		};

		inner.onDeleteContact = function (contact)
		{
			inner.agent.deleteContact(contact, inner.onDeleteSucceeded, inner.onDeleteFailed);
		};

		inner.renderTableHeaders = function (tbl)
		{
			tbl.addColumn('') // for edit button
				.addColumn(a['lable_contactName'])
				.addColumn(a['lable_contactEmail'])
				.addColumn(''); // for delete button
		};

		inner.renderContactRow = function (contact)
		{
			var row = j.tr();
			var editContactButton = j.button();
			editContactButton.attachData(contact)
								.addClass('edit-model-button');
			j.bindButtonCommand(editContactButton, j.command(inner.onEditContact));

			var deleteContactButton = j.button();
			deleteContactButton.attachData(contact)
					.addClass('delet-model-button');
			j.bindButtonCommand(deleteContactButton, j.command(inner.onDeleteContact));

			var nameField = j.textBlock(contact.getPropertyValue('Name'));

			var emailField = j.textBlock(contact.getPropertyValue('Email'));

			row.addCell(editContactButton)
				.addCell(nameField)
				.addCell(emailField)
				.addCell(deleteContactButton)
				.attachData(contact);
			return row;
		};

		inner.onContactListReturned = function (contactListModel)
		{
			inner.contactListModel = contactListModel;
			inner.contactListModel.subscribeToModelChange(inner.onModelListChanged);
			inner.view.clear();
			inner.tbl = j.table();
			inner.tbl.addClass('model-list-table contact-list-table');
			inner.renderTableHeaders(inner.tbl);
			for (var i = 0; i < contactListModel.numOfModels(); i++)
			{
				var contact = contactListModel.getModel(i);
				inner.tbl.addRow(inner.renderContactRow(contact));
			};
			inner.view.add(inner.tbl);
		};


		outer.createContactListView = function ()
		{
			inner.agent.getContactList(inner.onContactListReturned, inner.onGetContactListFailed);
			return inner.view;
		};

		return outer;
	};

	return { create: listContactController };
});