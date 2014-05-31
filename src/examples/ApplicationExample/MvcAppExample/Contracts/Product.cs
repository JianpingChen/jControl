namespace MvcAppExample.Contracts
{
	public class FileContentType
	{
		public FileContentType()
		{
			ContentType = string.Empty;
			Subtype = string.Empty;
		}
		public string ContentType { get; set; }
		public string Subtype { get; set; }
	}

	public class FileValue
	{
		public FileValue()
		{
			FileId = string.Empty;
			FileName = string.Empty;
			CurrentContentType = string.Empty;
		}
		
		public string FileName { get; set; }
		public string FileKey { get; set; }
		public string CurrentContentType { get; set; }
		public string FileId { get; set; }
	}

	public class FileProperty
	{
		public FileValue Value { get; set; }
		public FileContentType[] AcceptableTypes { get; set; }
	}

	public class MultiFileProperty
	{
		public FileContentType[] AcceptableTypes { get; set; }
		public FileValue[] Files { get; set; }
	}

	public enum ProductType
	{
		FamilyCar = 0,
		Suv,
		RaceCar
	} ;

	public class Product
	{
		public Product()
		{
			Id = -1;
			Name = string.Empty;
			ProductType = ProductType.FamilyCar;
			ProductVideo = new FileProperty 
							{ 
								AcceptableTypes = new FileContentType[]
								{
										new FileContentType { ContentType = "video", Subtype = "*"}
								},
								Value = new FileValue()
							};

			Pictures = new MultiFileProperty
						{
							AcceptableTypes = new FileContentType[]
											{
												new FileContentType {ContentType = "image", Subtype = "*"}
											},
							Files = new FileValue[0]
						};
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public ProductType ProductType { get; set; }
		public int Price { get; set; }
		public FileProperty ProductVideo { get; set; }
		public MultiFileProperty Pictures { get; set; }
	}
}