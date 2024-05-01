
export interface BasicModelTravis {

    id?:number,
    brand?:string,
    Brand?:Brand[],
      Name?: string;
      Description?: string;
      SKU?: string;
      MRP?:number|null;
    
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
       Gallery?:ImageType,
       gallery?:ImageType,
      AttributeSet?:TravisMathewAttribute[],
      TravisAttributes?: TravisMathewAttribute[] ,
      // Quantity?: Quantity[];
      Amount?: number;
      products?:DataModel;
      TotalQty?: number|null;
      Quantity88?: number|null;
       Quantity90?: number|null;
       ordered?: boolean;
       GST?:number;
       LessGST?: number;
       Discount?: number;
       LessDiscountAmount?: number;
       NetBillings?: number;
       FinalBillValue?: number;

      
}
export interface DataModel{
  data?:BasicModelTravisGraph[]
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
    Stock88?:number|null;
     Stock90?:number|null;
  }

 
 export interface ImageType {
    data:[{
      id:number,
      attributes?:{
        formats?:{
          thumbnail:ImageData,
          large?:ImageData,
          medium?:ImageData,
          small?:ImageData
        }
      }
    }]
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

  export interface Brand {
    data: {
      attributes: {
        Name?: string;
      };
    };
  }
  
