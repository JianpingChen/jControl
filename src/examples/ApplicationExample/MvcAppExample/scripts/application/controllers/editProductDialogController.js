define(['../../myControls',
		'../customControl/localizedFileButton',
		 '../abstractViews/productEditAbstractView'],
function (j, localizedFileButton, productEditAbstractView)
{
	function editProductDialogController(salesRepAgent, errorEvent)
	{
		var a = ApplicationStrings;

		var inner = {};
		inner.salesRepAgent = salesRepAgent;
		inner.errorEvent = errorEvent;

		inner.onProductSaved = function (sender, eventArg)
		{
			inner.abstractView.modelSavedEvent.unsubscribe(inner.onProductSaved);
			inner.originalModel.copy(inner.workingCopy);
		};

		var outer = {};
		outer.edit = function (productModel, parentView)
		{
			inner.parentView = parentView;
			inner.originalModel = productModel;
			inner.workingCopy = inner.originalModel.clone();
			inner.abstractView = productEditAbstractView.create(inner.workingCopy, inner.salesRepAgent, inner.errorEvent);
			inner.abstractView.modelSavedEvent.subscribe(inner.onProductSaved)

			inner.dialog = j.modalDialog(parentView);
			inner.dialog.getOuterContainer().addClass('editProductDialog-outerContainer');

			var titleContent = j.div('EditProductTitle');
			titleContent.add(j.textBlock(a['title_editProduct']))
						.addClass('dialog-title');

			var nameEdit = j.textInput().addClass('long-text');
			j.bindProperty(nameEdit, inner.abstractView, 'Name');

			var priceSpinner = j.intInput(0);
			j.bindProperty(priceSpinner, inner.abstractView, 'Price');

			var productTypeGroup = j.fieldset(j.spanText(a['label_productType']));
			inner.productTypeRadios = j.select();
			inner.productTypeRadios.addItem(j.textBlock(a['label_productType_FamilyCar']), 0)
							.addItem(j.textBlock(a['label_productType_Suv']), 1)
							.addItem(j.textBlock(a['label_productType_RaceCar']), 2);
			j.bindProperty(inner.productTypeRadios, inner.abstractView, 'ProductType');

			productTypeGroup.add(inner.productTypeRadios);

			inner.uploadForm = j.form();

			var videoEdit = localizedFileButton.create().setName('productVideo');
			j.bindFileProperty(videoEdit, inner.abstractView, 'ProductVideo');
			inner.uploadForm.add(j.div().add(j.textBlock(a['lable_productVideo'])
													.setDisplay('inline-block')
													.paddingAll('4px'))
										.add(videoEdit));

			var picturesEdit = localizedFileButton.create().setName('productPicture');
			//j.bindFileUpload(picturesEdit, inner.abstractView.productPicturesAccessor);

			inner.uploadForm.add(j.div().add(j.textBlock(a['lable_productPicture'])
													.setDisplay('inline-block')
													.paddingAll('4px'))
										.add(picturesEdit));

			var editContent = j.div().add(j.div().add(j.textBlock(a['lable_productName'])
															.setDisplay('inline-block')
															.paddingAll('4px'))
												.add(nameEdit.vAlign('top'))
												.marginAll('10px')
												.setDisplay('inline-block'))
									.add(j.div().add(j.spanText(a['label_productPrice'])
													.setDisplay('inline-block')
													.paddingAll('4px'))
												.add(priceSpinner.setDisplay('inline-block'))
												.add(j.spanText('K'))
												.marginAll('10px'))
									.add(j.div().add(productTypeGroup)
										.marginAll('10px'))
									.add(j.div().add(j.div().add(inner.uploadForm.vAlign('top'))
															.marginAll('10px'))
												.marginAll('10px')
												.setDisplay('inline-block'));

			inner.dialog.getButtonRow().addClass('modal-edit-dialog-buttonRow');
			var saveButton = inner.dialog.getButtonRowContent().getOkButton();
			saveButton.attachData(inner.uploadForm);

			inner.dialog.okCommand = inner.abstractView.saveCommand;

			inner.dialog.setTitleContent(titleContent)
					.add(editContent)
					.addClass('product-edit-dialog');

			inner.dialog.show();
		};

		return outer;
	};

	return { create: editProductDialogController };
});