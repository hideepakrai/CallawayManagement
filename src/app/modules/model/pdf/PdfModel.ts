export interface PdfModel{
    brand_id?: number;
    created_at?: string;
    discount_percent?: number;
    discount_type?: string;
    id?: number;
    items?:string;
    key: number;
    manager_id?: number;
    manager_name?: string;
    note?: string;
    order_date?: string;
    retailer_address?: string;
    retailer_gstin?: string;
    retailer_id?: number;
    retailer_name?: string;
    retailer_phone?: string;
    salesrep_id?: number;
    salesrep_name?: string;
    status?: string;
    total_value?: number;
    updated_at?: string;
    user_id?: number;
    total_val_pre_discount?:number,
    discount_amount?:number

      
      
}

export interface TravisPdfPrint{
    description?: string;
 name?:string;
 variation_sku?:string,
 variation_sku_data?:Variation_sku_data[],
 otherInfo:OtherInfoData;
 gallery_images_url?:string,
 primary_image_url?:string,
 family?:string,


} 

 export interface OtherInfoData{
    mrp?: number;
    color?:string;
    style_code?:string;
    category?:string;
    gender?:string;
    season?:string,
    product_model?:string,
    
}

 export interface Variation_sku_data{
    sku?:string;
        size?:string;
        qty?:number;
        mrp?:number;
  product_type?:string;

}