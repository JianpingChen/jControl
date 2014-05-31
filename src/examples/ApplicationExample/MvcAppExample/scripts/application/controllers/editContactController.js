define(['../businessLogic/salesRepAgent',
		'../../myControls',
		'../errorHandling/errorEventArg',
		'../abstractViews/contactEditAbstractView'],
function (salesRepAgent,
			j,
			errorEventArg,
			contactEditAbstractView)
{
	function editContactController(doneWithWorkAreaEvent, errorEvent)
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.agent = salesRepAgent.create();
		inner.doneEvent = doneWithWorkAreaEvent;
		inner.errorEvent = errorEvent;

		inner.onModelSaved = function (sender, model)
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onModelSaved);
			inner.doneEvent.raiseEvent(outer);
		};

		inner.onCancel = function ()
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onModelSaved);
			inner.doneEvent.raiseEvent(outer);
		};

		var outer = {};

		inner.fillContactDetails = function (contactModel)
		{
			inner.abstractView = contactEditAbstractView.create(contactModel, inner.agent, inner.errorEvent);
			inner.abstractView.modelSavedEvent.subscribe(inner.onModelSaved);

			var saveButton = j.button(a['label_save']);
			saveButton.addClass('dialogButton')
					.floatLeft();
			j.bindButtonCommand(saveButton, inner.abstractView.saveCommand);

			var cancelButton = j.button(a['label_cancel']);
			cancelButton.addClass('dialogButton')
						.floatLeft();
			j.bindButtonCommand(cancelButton, j.command(inner.onCancel));

			var nameEdit = j.textInput();
			j.bindProperty(nameEdit, inner.abstractView, 'Name');

			var emailEdit = j.textInput();
			j.bindProperty(emailEdit, inner.abstractView, 'Email');

			var genderEdit = j.select();
			genderEdit.addItem(j.textBlock(a['label_genderUnknown']), 0)
						.addItem(j.textBlock(a['label_genderMale']), 1)
						.addItem(j.textBlock(a['label_genderFemale']), 2);
			j.bindProperty(genderEdit, inner.abstractView, 'Gender');

			var dobEdit = j.datetimeInput();
			j.bindProperty(dobEdit, inner.abstractView, 'DateOfBirth');

			inner.editView.add(j.div().add(j.textBlock(a['lable_contactName'])
												.setDisplay('inline-block')
												.paddingAll('4px'))
									.add(nameEdit.vAlign('top'))
									.marginAll('10px')
									.setDisplay('inline-block'))
						.add(j.div().add(j.textBlock(a['lable_contactEmail'])
											.setDisplay('inline-block')
											.paddingAll('4px'))
									.add(emailEdit.vAlign('top'))
									.marginAll('10px')
									.setDisplay('inline-block'))
						.add(j.div().add(j.textBlock(a['lable_gender'])
											.setDisplay('inline-block')
											.paddingAll('4px'))
									.add(genderEdit)
									.marginAll('10px')
									.setDisplay('inline-block'))
						.add(j.div().add(j.textBlock(a['lable_dateOfBirth'])
											.setDisplay('inline-block')
											.paddingAll('4px'))
									.add(dobEdit)
									.marginAll('10px')
									.setDisplay('inline-block'))
						.add(j.div().add(saveButton)
									.add(cancelButton)
									.marginAll('10px'));
		};

		inner.renderEditView = function ()
		{
			inner.editView = j.div('editContactController.editView');
			inner.editView.addClass('editContactController-editView');
			return inner.editView;
		};

		outer.createNewContact = function ()
		{
			var model = inner.agent.createNewContact();
			inner.renderEditView();
			inner.fillContactDetails(model);
			return inner.editView;
		}

		outer.editContact = function (contactModel)
		{
			var editView = inner.renderEditView();
			inner.fillContactDetails(contactModel);
			return editView;
		};

		return outer;
	};

	return { create: editContactController };

});