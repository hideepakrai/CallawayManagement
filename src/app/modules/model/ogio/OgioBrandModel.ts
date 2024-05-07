
export interface OgioBasicModel {

     id?:number,
      Name?: string|undefined;
      brand?:string |undefined,
       Brand?:number,
      Description?: string |undefined;
      SKU?: string |undefined;
      
      Gallery?:string |undefined;
      MRP?: number | null;
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
      AttributeSet?:OgioModel[],
      OgiAttributes?:OgioModel[],
      Quantity?: number;
      Amount?: number;
  
      TotalQty?: number|null;
      Quantity88?: number|null;
       Quantity90?: number|null;
       ordered?: boolean, 
       GST?:number,
       LessGST?:number,
       Discount?:number,
       LessDiscountAmount?:number,
       NetBillings?:number,
       FinalBillValue?:number,

}
export interface OgioBasicModelGraph {

    id?:number,
    attributes:OgioBasicModel
  }
 
  export interface OgioUploadDataModel{
    data?:OgioBasicModel
  }


export interface OgioModel{
  id?:number;
  ProductType?:string | null;
  Category?:string | null;
  ProductModel?:string | null;
  LifeCycle?:string | null;
  Stock90?:number|null;
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
  export interface Brand{
    data?: {
      attributes?: {
        Name?: string;
      };
    };
  }