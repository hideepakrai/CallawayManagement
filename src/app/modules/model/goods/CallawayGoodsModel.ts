
export interface BasicModelGoods {

    stock_88?: number;


  brand?:string,

  sku?:string;
  brand_id?:number|null;
  variation_sku?:string;
  name?:string;
  description?:string;
  mrp?:number;
  gst?:number;
  product_type?:string;
  product_model?:string;
  life_cycle?:string;
  orientation?:string;
      stock_90?:number,
      primary_image_url?:string,
      gallery_images_url?:string,
     category?:string,
     gender?:string
     season?:string
     color?:string,
     series?:string,
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
     primaryImage?: string;
     secondaryImage?:[];
    


    
   

}
export interface BasicModelGoodsGraph {

    id?:number,
    attributes:BasicModelGoods
  }
 
  export interface StockAvailable{
    stock88: number,
    stock90: number
  }
  export interface Quantity {
    quantity88: number;
    quantity90: number;
  
  }
export interface GoodsAttributes {
              ProductType?:string;
              ProductModel?:string | null;
              Category?:string | null;
              Orientation?:string | null;
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

  export interface Brand {
    __typename:string,
    data: {
      attributes: {
        Name?: string;
      };
    };
  }
