define(['../businessLogic/salesRepAgent',
		'../../myControls',
		'../customControl/localizedFileButton',
		'../errorHandling/errorEventArg',
		'../abstractViews/productEditAbstractView'],
function (salesRepAgent,
			j,
			localizedFileButton,
			errorEventArg,
			productEditAbstractView)
{
	function editProductView()
	{
		var a = ApplicationStrings;

		var inner = {};

		inner.renderNameRequirement = function ()
		{
			var requirement = j.div();
			requirement.add(j.h3(a['text_businessRequirement']))
						.add(j.textBlock(a['text_businessRequirementContent']))
						.add(j.h3(a['text_uiRequirement']))
						.add(j.textBlock(a['text_uiRequirement1']))
						.add(j.textBlock(a['text_uiRequirement2']))
						.add(j.textBlock(a['text_uiRequirement3']))
						.add(j.textBlock(a['text_uiRequirement4']));
			return requirement;
		};

		inner.saveButton = j.button(a['label_save']);
		inner.saveButton.addClass('dialogButton');

		inner.cancelButton = j.button(a['label_cancel']);
		inner.cancelButton.addClass('dialogButton');

		inner.nameEdit = j.textInput().setName('productName');

		inner.priceSpinner = j.intInput(0);
		inner.priceSpinner.addClass('inline-spinner');

		inner.productTypeGroup = j.fieldset(j.spanText(a['label_productType']));
		inner.productTypeRadios = j.select();
		inner.productTypeRadios.addItem(j.textBlock(a['label_productType_FamilyCar']), 0)
							.addItem(j.textBlock(a['label_productType_Suv']), 1)
							.addItem(j.textBlock(a['label_productType_RaceCar']), 2);
		
		inner.productTypeGroup.add(inner.productTypeRadios);

		inner.uploadForm = j.form();
		inner.videoEdit = localizedFileButton.create().setName('productVideo');
		inner.uploadForm.add(j.div().add(j.textBlock(a['lable_productVideo'])
													.addClass('shortPropertyLabel'))
										.add(inner.videoEdit));
		inner.picturesEdit = localizedFileButton.create().setName('productPicture');
		inner.uploadForm.add(j.div().add(j.textBlock(a['lable_productPicture'])
											.addClass('shortPropertyLabel'))
									.add(inner.picturesEdit));

		inner.saveButton.attachData(inner.uploadForm);

		var outer = j.div('editProductView');
		outer.addClass('editProductController-editView')
			.add(inner.renderNameRequirement())
			.add(j.div().add(j.textBlock(a['lable_productName'])
										.addClass('shortPropertyLabel'))
						.add(inner.nameEdit.vAlign('top'))
						.addClass('simplePropertyEditContainer'))
			.add(j.div().add(j.spanText(a['label_productPrice'])
									.addClass('shortPropertyLabel'))
						.add(inner.priceSpinner)
						.add(j.spanText('K'))
						.addClass('simplePropertyEditContainer'))
			.add(j.div().add(inner.productTypeGroup)
						.addClass('simplePropertyEditContainer'))
			.add(j.div().add(inner.uploadForm.vAlign('top'))
						.addClass('simplePropertyEditContainer'))
			.add(j.div().add(inner.saveButton)
					.add(inner.cancelButton)
					.addClass('simplePropertyEditContainer'));

		outer.getSaveButton = function ()
		{
			return inner.saveButton;
		};

		outer.getCancelButton = function ()
		{
			return inner.cancelButton;
		};

		outer.getNameEdit = function ()
		{
			return inner.nameEdit;
		};

		outer.getPriceSpinner = function ()
		{
			return inner.priceSpinner;
		};

		outer.getProductTypeRadios = function ()
		{
			return inner.productTypeRadios;
		};

		outer.getVideoEdit = function ()
		{
			return inner.videoEdit;
		};

		outer.getPicturesEdit = function ()
		{
			return inner.picturesEdit;
		};

		outer.getSaveProgress = function ()
		{
			return inner.progress;
		};

		return outer;
	};

	return { create: editProductView };
});