define([], function ()
{
	function mockEmtpyProduct()
	{
		var empty =
		{
			Name: '',
			Price: 0,
			ProductType: 0,
			ProductVideo: {
				"__type": "FileProperty",
				AcceptableTypes: [{ ContentType: 'video', Subtype: '*'}],
				Value: {
							FileName: '',
							FileKey: '',
							CurrentContentType: '' 
						}
				},
			Pictures: [{}]
		};

		return empty;
	}

	return { create: mockEmtpyProduct };
});