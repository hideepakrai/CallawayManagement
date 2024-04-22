
export interface BasicModelTravis {

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
      AttributeSet?:BasicModelTravisGraph[],
      TravisAttributes?: TravisMathewAttribute[] ,
      Quantity?: number;
      Amount?: number;
    
   

}
export interface BasicModelTravisGraph {

    id?:number,
    attributes:BasicModelTravis
  }
 

  export interface TravisMathewAttribute{
    StyleCode?:string | null;
    Length?:string | null;
    Category?:string | null;
    Season?:string | null;
    Line?:string | null;
    Color?:string | null;
    ColorCode?:string | null;
    __typename?:string | null;
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

