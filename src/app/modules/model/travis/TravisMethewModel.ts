
export interface BasicModelTravis {
    
    sku?:string;
    brand_id?:number|null;
    variation_sku?:string;
    name?:string;
    description?:string;
    mrp?:number;
    gst?:number;
    length?:string|null;
      color_code?:string
      size?:string,
        stock_88?:number,
        stock_90?:number,
        primary_image_url?:string,
        gallery_images_url?:string,
       category?:string,
       gender?:string
       season?:string
       color?:string,
        line?:string,
          style_code?:string,
          size_type?:string
          Amount?: number;
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
       error88?:string;
       error90?:string;



      // Quantity?: Quantity[];
      
      products?:DataModel;
      
       id?:number,
       brand?:string,
       Brand?:number,
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
      
}

export interface UpdateTravisModel{
  data?:BasicModelTravis
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
    data:DataImageData[]
  }
  
  

  export interface DataImageData{
    id:number|null,
    attributes?:{
      formats?:{
        thumbnail:ImageData,
        large?:ImageData,
        medium?:ImageData,
        small?:ImageData
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

  export interface Brand {
    data: {
      attributes: {
        Name?: string;
      };
    };
  }
  
