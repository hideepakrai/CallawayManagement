
export interface OgioBasicModel {

    id?:number,
      Name?: string;
      Description?: string;
      SKU?: string;
      StockManagement?: boolean;
      StockStatus?: string;
      RegularPrice?: number;
      SalePrice?: number | null;
      StockAvailable?: number;
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
      AttributeSet?:OgioModel[],
      OgiAttributes?:OgioModel[],
      Quantity?: number;
      Amount?: number;

}
export interface OgioBasicModelGraph {

    id?:number,
    attributes:OgioBasicModel
  }
 


export interface OgioModel{
  id?:number;
  ProductType?:string | null;
  Category?:string | null;
  ProductModel?:string | null;
  LifeCycle?:string | null;
}
 
 export interface ImageType {
    data:{
      id:number,
      attributes?:{
        formats?:{
          thumbnail:ImageData,
          large?:ImageData,
          medium?:ImageData,
          small?:ImageData
        }
      }
    }
  }
  

  export interface ImageData{
    name?: string;
    hash?: string;
    ext?: string;
    mime?: string;
    path?: null | string;
    width?: number;
    height?: number;
    size?: number;
    url?: string;
  }

 

  export interface BrandType {
    id: number;
    Name: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }