export interface AllOrderModel{
    sku?: string;
    brand_id?:number;
    name?:string;
    description?: string ;
    mrp?: number ;
    gst?:number,
    primary_image_url?:string;
    gallery_images_url?:string ;
    product_type?:string;
    variation_sku?:string;
    stock_88?:number;
    stock_90?:number;
    category?:string;
    product_model?:string;
    Brand?:string
    brand?:string
   primaryImage?:string,
   secondaryImage?:string;
    SKU?: string;
        Amount?: number
        TotalQty?: number;
        Quantity88?: number;
         Quantity90?: number;
         ordered?: boolean, 
         LessGST?:number,
         Discount?:number,
         LessDiscountAmount?:number,
         NetBillings?:number,
         FinalBillValue?:number,
         error?:string,
         has_image?:number,
         family?:string,
  
    length?:string;
  
      color_code?:string
      size?:string,
       
       gender?:string
       season?:string
       color?:string,
        line?:string,
          style_code?:string,
          size_type?:string
       
       GST?:number;

       error88?:string;
       error90?:string;
      

   

         Name?: string;
         Description?: string;
    
         MRP?:number;
       
         SetType?: string;
      
      
         id?:number,
         order_date?:string,
       items?:string,
       discount_type?:string,
        discount_percent?:number,
       total_value?:number,
       status?:string,
        manager_id?:number,
        retailer_id?:number,
       salesrep_id?:number,
       user_id?:number,
       item?:string
       
       created_at?: string;
       key?: number;
       manager_name?: string;
       note?: string;
       totalAmount?:number,
       discountAmount?:number
       retailer_address?: string;
       retailer_gstin?: string;
      
       retailer_name?: string;
       retailer_phone?: string;
       
       salesrep_name?: string;
       
       updated_at?: string;
       total_val_pre_discount?:number,
       discount_amount?:number
         
}