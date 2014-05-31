define(['../../myControls',
		 '../abstractViews/contactEditAbstractView'],
function (j, contactEditAbstractView)
{
	function editContactWizardController(salesRepAgent, errorEvent)
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.salesRepAgent = salesRepAgent;
		inner.errorEvent = errorEvent;

		inner.onContactSaved = function (sender, eventArg)
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onContactSaved);
			inner.originalModel.copy(inner.workingCopy);
		};

		var outer = {};
		outer.edit = function (contactModel, parentView)
		{
			inner.parentView = parentView;
			inner.originalModel = contactModel;
			inner.workingCopy = inner.originalModel.clone();
			inner.abstractView = contactEditAbstractView.create(inner.workingCopy, inner.salesRepAgent, inner.errorEvent);
			inner.abstractView.modelSavedEvent.subscribe(inner.onContactSaved)

			inner.dialog = j.modalDialog(parentView);
			inner.dialog.getOuterContainer().addClass('editContactDialog-outerContainer');
			inner.dialog.getButtonRow().addClass('wizard-edit-dialog-buttonRow');

			inner.dialog.setTitleContent(j.textBlock(a['title_editContact']));

			var nameEdit = j.textInput().addClass('long-text');
			j.bindProperty(nameEdit, inner.abstractView, 'Name');

			var genderEdit = j.select();
			genderEdit.addItem(j.textBlock(a['label_genderUnknown']), 0)
						.addItem(j.textBlock(a['label_genderMale']), 1)
						.addItem(j.textBlock(a['label_genderFemale']), 2);
			j.bindProperty(genderEdit, inner.abstractView, 'Gender');

			var nameEditRow = j.div().add(j.textBlock(a['lable_contactName'])
											.paddingAll('4px'))
									.add(nameEdit.vAlign('top'))
									.marginAll('10px');
			var genderEditRow = j.div().add(j.div().add(j.textBlock(a['lable_gender'])
														.setDisplay('inline-block')
														.paddingAll('4px'))
													.add(genderEdit)
													.marginAll('10px')
													.setDisplay('inline-block'));

			var emailEdit = j.textInput().addClass('long-text');
			j.bindProperty(emailEdit, inner.abstractView, 'Email');

			var dobEdit = j.datetimeInput();
			j.bindProperty(dobEdit, inner.abstractView, 'DateOfBirth');

			var emailEditRow = j.div().add(j.textBlock(a['lable_contactEmail'])
											.paddingAll('4px'))
									.add(emailEdit.vAlign('top'))
									.marginAll('10px');
			var dobEditRow = j.div().add(j.textBlock(a['lable_dateOfBirth'])
											.setDisplay('inline-block')
											.paddingAll('4px'))
									.add(dobEdit)
									.marginAll('10px')
									.setDisplay('inline-block');

			inner.dialog.okCommand = inner.abstractView.saveCommand;
			inner.dialog.addClass('contact-edit-dialog')
						.add(nameEditRow)
						.add(genderEditRow)
						.add(emailEditRow)
						.add(dobEditRow)
						.show();
		};

		return outer;
	};

	return { create: editContactWizardController };
});