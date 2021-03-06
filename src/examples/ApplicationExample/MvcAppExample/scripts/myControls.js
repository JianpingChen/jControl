/**
Expose all public classes defined in the library.

@main jControl library

*/
define([
	'./lib/elements/a',
	'./lib/elements/body',
	'./lib/elements/br',
	'./lib/elements/button',
	'./lib/elements/checkbox',
	'./lib/elements/containerElement',
	'./lib/elements/datetimeInput',
	'./lib/elements/div',
	'./lib/elements/divButton',
	'./lib/elements/documentElement',
	'./lib/elements/fieldset',
	'./lib/elements/fileInput',
	'./lib/elements/floatInput',
	'./lib/elements/footer',
	'./lib/elements/form',
	'./lib/elements/h1',
	'./lib/elements/h2',
	'./lib/elements/h3',
	'./lib/elements/header',
	'./lib/elements/hr',
	'./lib/elements/iframe',
	'./lib/elements/img',
	'./lib/elements/intInput',
	'./lib/elements/label',
	'./lib/elements/li',
	'./lib/elements/ol',
	'./lib/elements/optGroup',
	'./lib/elements/option',
	'./lib/elements/p',
	'./lib/elements/param',
	'./lib/elements/position',
	'./lib/elements/radioButton',
	'./lib/elements/select',
	'./lib/elements/size',
	'./lib/elements/span',
	'./lib/elements/spanText',
	'./lib/elements/table',
	'./lib/elements/tbody',
	'./lib/elements/td',
	'./lib/elements/textArea',
	'./lib/elements/textBlock',
	'./lib/elements/textInput',
	'./lib/elements/textNode',
	'./lib/elements/tfoot',
	'./lib/elements/th',
	'./lib/elements/thead',
	'./lib/elements/tr',
	'./lib/elements/ul',
	'./lib/elements/windowElement',
	'./lib/observe/acceptType',
	'./lib/observe/bindButtonCommand',
	'./lib/observe/bindProperty',
	'./lib/observe/bindFileProperty',
	'./lib/observe/collectionModelBase',
	'./lib/observe/command',
	'./lib/observe/customEvent',
	'./lib/observe/fileHandlingModelFactory',
	'./lib/observe/filePropertyModel',
	'./lib/observe/fileTypeModel',
	'./lib/observe/fileValueModel',
	'./lib/observe/guid',
	'./lib/observe/modelBase',
	'./lib/observe/modelFactory',
	'./lib/observe/multiFilePropertyModel',
	'./lib/observe/observable',
	'./lib/observe/observableCollection',
	'./lib/comm/formDataPost',
	'./lib/comm/asyncGetCall',
	'./lib/comm/asyncPostCall',
	'./lib/comm/asyncCallParam',
	'./lib/comm/formPost',
	'./lib/comm/formDirectPost',
	'./lib/comm/restCallBase',
	'./lib/comm/restDelete',
	'./lib/comm/restGet',
	'./lib/comm/restGetAll',
	'./lib/comm/restPost',
	'./lib/comm/restPut',
	'./lib/comm/serviceProxy',
	'./lib/controls/dialogSkeleton',
	'./lib/controls/fileBrowseButton',
	'./lib/controls/modalDialog',
	'./lib/controls/popup',
	'./lib/controls/valueContainer',
	'./lib/ecma5-r'
	],
function (
	a,
	body,
	br,
	button,
	checkbox,
	containerElement,
	datetimeInput,
	div,
	divButton,
	documentElement,
	fieldset,
	fileInput,
	floatInput,
	footer,
	form,
	h1,
	h2,
	h3,
	header,
	hr,
	iframe,
	img,
	intInput,
	label,
	li,
	ol,
	optGroup,
	option,
	p,
	param,
	position,
	radioButton,
	select,
	size,
	span,
	spanText,
	table,
	tbody,
	td,
	textArea,
	textBlock,
	textInput,
	textNode,
	tfoot,
	th,
	thead,
	tr,
	ul,
	windowElement,
	acceptType,
	bindButtonCommand,
	bindProperty,
	bindFileProperty,
	collectionModelBase,
	command,
	customEvent,
	fileHandlingModelFactory,
	filePropertyModel,
	filTypeModel,
	fileValueModel,
	guid,
	modelBase,
	modelFactory,
	multiFilePropertyModel,
	observable,
	observableCollection,
	formDataPost,
	asyncGetCall,
	asyncPostCall,
	asyncCallParam,
	formPost,
	formDirectPost,
	restCallBase,
	restDelete,
	restGet,
	restGetAll,
	restPost,
	restPut,
	serviceProxy,
	dialogSkeleton,
	fileBrowseButton,
	modalDialog,
	popup,
	valueContainer
			)
{
	var lib = {
		a: a.create,
		acceptType: acceptType.create,
		body: body.create,
		br: br.create,
		button: button.create,
		checkbox: checkbox.create,
		containerElement: containerElement.create,
		datetimeInput: datetimeInput.create,
		div: div.create,
		divButton: divButton.create,
		documentElement: documentElement.create,
		fieldset: fieldset.create,
		fileInput: fileInput.create,
		floatInput: floatInput.create,
		footer: footer.create,
		form: form.create,
		h1: h1.create,
		h2: h2.create,
		h3: h3.create,
		header: header.create,
		hr: hr.create,
		iframe: iframe.create,
		img: img.create,
		intInput: intInput.create,
		label: label.create,
		li: li.create,
		ol: ol.create,
		optGroup: optGroup.create,
		option: option.create,
		p: p.create,
		param: param.create,
		position: position.create,
		radioButton: radioButton.create,
		select: select.create,
		size: size.create,
		span: span.create,
		spanText: spanText.create,
		table: table.create,
		tbody: tbody.create,
		td: td.create,
		textArea: textArea.create,
		textBlock: textBlock.create,
		textInput: textInput.create,
		textNode: textNode.create,
		tfoot: tfoot.create,
		th: th.create,
		thead: thead.create,
		tr: tr.create,
		ul: ul.create,
		windowElement: windowElement.create,
		bindButtonCommand: bindButtonCommand.create,
		bindProperty: bindProperty.create,
		bindFileProperty: bindFileProperty.create,
		collectionModelBase: collectionModelBase.create,
		command: command.create,
		customEvent: customEvent.create,
		fileHandlingModelFactory: fileHandlingModelFactory.create,
		filePropertyModel: filePropertyModel.create,
		filTypeModel: filTypeModel.create,
		fileValueModel: fileValueModel.create,
		guid: guid.create,
		modelBase: modelBase.create,
		modelFactory: modelFactory.create,
		multiFilePropertyModel: multiFilePropertyModel.create,
		observable: observable.create,
		observableCollection: observableCollection.create,
		formDataPost: formDataPost.create,
		asyncGetCall: asyncGetCall.create,
		asyncPostCall: asyncPostCall.create,
		asyncCallParam: asyncCallParam.create,
		formPost: formPost.create,
		formDirectPost: formDirectPost.create,
		restCallBase: restCallBase.create,
		restDelete: restDelete.create,
		restGet: restGet.create,
		restGetAll: restGetAll.create,
		restPost: restPost.create,
		restPut: restPut.create,
		serviceProxy: serviceProxy.create,
		dialogSkeleton: dialogSkeleton.create,
		fileBrowseButton: fileBrowseButton.create,
		modalDialog: modalDialog.create,
		popup: popup.create,
		valueContainer: valueContainer.create
	};

	lib.fixJsonDate = function (dateString)
	{
		var dateValue = null;
		try
		{
			dateValue = Date.parse(dateString);
		}
		catch (e)
		{
		}
		if ((dateValue != null)
			&& (!isNaN(dateValue)))
			return new Date(dateValue);

		var start = 0;
		var end = dateString.length;
		if (dateString.contains('('))
		{
			// some json serializer writes date like '/new Date(<integer>)/'
			start = dateString.indexOf('(') + 1;
			end = dateString.indexOf(')');
			dateValue = parseInt(dateString.substr(start, end - start));
		}
		else
		{
			// IE 8 cannot handle '2014-04-06T15:55:40.7342791-07:00'
			return new Date(dateString.substring(0, 10).replace(/-/g, '/'));
		}
		if (!isNaN(dateValue))
			return new Date(dateValue);

		var parts = dateString.substring(0, 10).split('-');
		return new Date(parts[0], parseInt(parts[1])-1, parseInt(parts[2]));

	};

	return lib;
});
