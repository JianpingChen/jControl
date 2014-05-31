define(['../../myControls',
		'../models/product',
		'../models/contact',
		'../models/productList',
		'../models/contactList'],
function (j,
		product,
		contact,
		productList,
		contactList)
{
	function dataPostCall(modelData, fileUploadForm, relativePath, successCallback, failureCallback, progressCallback)
	{
		var inner = {};
		inner.paramName = 'modelValue';
		inner.successCallback = successCallback;
		inner.defaultErrorHandler = function (errorMesage)
		{
			alert(errorMesage);
		};
		inner.failureCallback = inner.defaultErrorHandler;
		if (typeof failureCallback === 'function')
			inner.failureCallback = failureCallback;

		inner.onSubmitted = function (responseText, commCallback)
		{
			var startMarker = 'id="returnCode">';
			var returnCodeStart = responseText.indexOf(startMarker);
			if (returnCodeStart < 0)
			{
				// IE 8 quirk
				startMarker = 'returnCode>';
				returnCodeStart = responseText.indexOf(startMarker);
			}
			var endMarker = '</';
			var returnCodeEnd = responseText.indexOf(endMarker, returnCodeStart);
			var contentStart = returnCodeStart + startMarker.length;
			var returnCodeContent = responseText.substr(contentStart, returnCodeEnd - contentStart);
			var codeObj = JSON.parse(returnCodeContent);
			if (codeObj['ReturnCode'] == 'Success')
				inner.successCallback('Success');
			else
			{
				var msgStartMarder = 'id="returnMessage">';
				var returnMsgStart = responseText.indexOf(msgStartMarder);
				if (returnMsgStart < 0)
				{
					// IE 8 quirk
					msgStartMarder = 'returnMessage>';
					returnMsgStart = responseText.indexOf(msgStartMarder);
				}
				var returnMsgEnd = responseText.indexOf(endMarker, returnMsgStart);
				var msgStart = returnMsgStart + msgStartMarder.length;
				var returnMsgContent = responseText.substr(msgStart, returnMsgEnd - msgStart);
				var msgObj = JSON.parse(returnMsgContent);
				inner.failureCallback(codeObj['ReturnCode'], msgObj['ReturnMessage']);
			}
		};

		var outer = j.formPost({
			modelParamName: inner.paramName,
			serializedModel: modelData.getSerializedData(),
			relativePath: relativePath,
			onSubmitted: inner.onSubmitted,
			fileUploadForm: fileUploadForm,
			progressCallback: progressCallback
		});

		return outer;
	};

	function createProductCall(successCallback, failureCallback)
	{
		var inner = {};
		inner.modelCallback = successCallback;
		inner.constructModel = function (productJson)
		{
			var prod = product.create(productJson);
			inner.modelCallback(prod);
		};
		var outer = j.asyncGetCall({
			className: 'createProductCall',
			relativePath: 'CreateProduct',
			successCallback: inner.constructModel,
			failureCallback: failureCallback
		});
		return outer;
	};

	function listProductCall(successCallback, failureCallback)
	{
		var inner = {};
		inner.successCallback = successCallback;
		inner.failureCallback = failureCallback;
		inner.onProductListReturned = function (productListJson)
		{
			inner.successCallback(productList.create(productListJson));
		};

		var outer = j.asyncGetCall({
			className: 'listProductCall',
			relativePath: 'ListProduct',
			successCallback: inner.onProductListReturned, failureCallback: inner.failureCallback
		});
		return outer;
	};

	function deleteProductCall(product, successCallback, failureCallback)
	{
		var deleteRequest = {};
		deleteRequest['__type'] = 'DeleteProductRequest';
		deleteRequest['ProductId'] = product.getId();
		var request = JSON.stringify(deleteRequest);
		var options = {};
		options['className'] = 'deleteProductCall';
		options['relativePath'] = 'DeleteProduct';
		options['data'] = request;
		options['callbackParam'] = product;
		options['successCallback'] = successCallback;
		options['failureCallback'] = failureCallback;
		var outer = j.asyncPostCall(options);
		return outer;
	};

	function serviceCallback(successCallback, failureCallback, callbackParam)
	{
		return { success: successCallback,
			failure: failureCallback,
			callbackParam: callbackParam
		};
	};

	function salesRepAgent()
	{
		var inner = {};
		inner.service = j.serviceProxy('/Server/');
		inner.contactRestService = j.serviceProxy('api/Contact');

		var outer = {};

		outer.createNewProduct = function (successCallback, failureCallback)
		{
			var createCall = createProductCall(successCallback, failureCallback);
			inner.service.executeAsyncCall(createCall);
			return outer;
		};

		outer.saveProduct = function (productModel, fileUploadForm, successCallback, failureCallback, progressCallback)
		{
			var saveProductCall = dataPostCall(productModel, fileUploadForm, 'SaveProduct', successCallback, failureCallback, progressCallback);
			inner.service.executeAsyncCall(saveProductCall);
			return outer;
		};

		outer.getProductList = function (successCallback, failureCallback)
		{
			var getProducts = listProductCall(successCallback, failureCallback);
			inner.service.executeAsyncCall(getProducts);
			return outer;
		};

		outer.deleteProduct = function (productModel, successCallback, failureCallback)
		{
			var deleteCall = deleteProductCall(productModel, successCallback, failureCallback);
			inner.service.executeAsyncCall(deleteCall);
			return outer;
		};

		outer.createNewContact = function ()
		{
			return contact.create();
		};

		inner.updateContact = function (contactModel, successCallback, failureCallback)
		{
			var options = {
				successCallback: function ()
				{
					successCallback(contactModel);
				},
				failureCallback: failureCallback
			};
			var saveCall = j.restPut('' + contactModel.getId(), contactModel.getData(), options);
			inner.contactRestService.executeAsyncCall(saveCall);
		};

		inner.addContact = function (contactModel, successCallback, failureCallback)
		{
			var options = {
				successCallback: function (contactData)
				{
					var serverContact = contact.create(contactData);
					successCallback(serverContact);
				},
				failureCallback: failureCallback
			};
			var createContact = j.restPost(contactModel.getData(), options);
			inner.contactRestService.executeAsyncCall(createContact);
		};

		outer.saveContact = function (contactModel, successCallback, failureCallback)
		{
			if (contactModel.getId() > 0)
			{
				inner.updateContact(contactModel, successCallback, failureCallback);
			}
			else
			{
				inner.addContact(contactModel, successCallback, failureCallback);
			}

			return outer;
		};

		outer.getContactList = function (successCallback, failureCallback)
		{
			var options = {
				successCallback: function (contactListJson)
				{
					successCallback(contactList.create(contactListJson));
				},
				failureCallback: failureCallback
			};

			var getContacts = j.restGetAll(options);
			inner.contactRestService.executeAsyncCall(getContacts);
			return outer;
		};

		outer.deleteContact = function (contactModel, successCallback, failureCallback)
		{
			var options = {
				successCallback: function ()
				{
					successCallback(contactModel);
				},
				failureCallback: failureCallback
			};
			var deleteCall = j.restDelete('' + contactModel.getId(), options);
			inner.contactRestService.executeAsyncCall(deleteCall);
			return outer;
		};

		return outer;
	};

	return { create: salesRepAgent };
});