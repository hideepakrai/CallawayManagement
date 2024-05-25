export interface BasicModelApparel {
brand?: string;
    sku?:string;
    brand_id?:number|null;
    variation_sku?:string;
    name?:string;
    description?:string;
    mrp?:number;
    gst?:number;
    color?:string;
    size?:string;
    category?:string,
    gender?:string;
    series?:string,
    type?:string;
    style_id?:string;
    sleeves?:string;
    season?:string
    stock_90?:number,
     stock_88?:number
    primary_image_url?:string,
    gallery_images_url?:string,
         
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
       secondaryImage?:[]
  
  
      
     
  
  }