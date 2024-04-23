
export interface BasicModelTravis {

    id?:number,
      Name?: string;
      Description?: string;
      SKU?: string;
      StockManagement?: boolean;
      StockStatus?: string;
      RegularPrice?: number;
      SalePrice?: number | null;
      StockAvailable?:StockAvailable[] ;
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
      AttributeSet?:TravisMathewAttribute[],
      TravisAttributes?: TravisMathewAttribute[] ,
      // Quantity?: Quantity[];
      Amount?: number;
      StockAvailable88?:number|null;
      StockAvailable90?:number|null;
      TotalQty?: number|null;
      Quantity88?: number|null;
       Quantity90?: number|null;
       ordered?: boolean
      
    
   

}

export interface StockAvailable{
  stock88: number,
  stock90: number
}

export interface Quantity {
  quantity88: number;
  quantity90: number;

}
export interface BasicModelTravisGraph {

    id?:number,
    attributes:BasicModelTravis
  }
 

  export interface TravisMathewAttribute {
    StyleCode?:string | null;
    Length?:string | null;
    Category?:string | null;
    Season?:string | null;
    Line?:string | null;
    Color?:string | null;
    ColorCode?:string | null;
    __typename?:string | null;
    Gender?:string | null;
    Size?:string | null;
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

