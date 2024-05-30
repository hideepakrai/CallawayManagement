import {BasicModelTravis} from "../../model/travis/TravisMethewModel"

export interface CartModel{
  id?:number,
  order_date?:string,
items?:string,
discount_type?:string,
 discount_percent?:number,
total_value?:number,
status?:string,
 manager_id?:number|null,
 retailer_id?:number,
salesrep_id?:number,
user_id?:number,
item?:string
brand_id?: number;
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
    export interface AccountOrder{
      id?:number,
      order_date?:string,
    items?:string,
    discount_type?:string,
     discount_percent?:number,
    total_value?:number,
    status?:string,
     manager_id?:number|null,
     retailer_id?:number,
    salesrep_id?:number,
    user_id?:number,
    item?:string
    brand_id?: number;
    created_at?: string;
    retailer_details?:string;
    manager_name?: string;
    note?: string;
    
    retailer_address?: string;
    retailer_gstin?: string;
    
    retailer_name?: string;
    retailer_phone?: string;
    
    salesrep_name?: string;
    
    updated_at?: string;
    total_val_pre_discount?:number,
    discount_amount?:number
      
    }
   export  interface ItemModel {
      sku: string;
      mrp: number;
      stock_90: number;
      stock_88: number;
      
    }
 export interface ConnectData{
  
    id?:number |undefined,
    position?:{
      end?:boolean
    }
  }
 

export interface ProductCard{
  product:ProductData,
  Qty88?:number|null|undefined,
  Qty90?:number|null|undefined,
  UnitPrice?:number|null,
   TotalPrice?: number | null|undefined,
}

export interface ProductDetails{
   product?:number,
   Qty88?:number|null|undefined,
   Qty90?:number|null|undefined,
   UnitPrice?:number|null,
    TotalPrice?: number | null|undefined,
    
}

export interface Comments{
  Comment?:string|null
  Type?:string;
  "users_permissions_user (1)"?:number;
}

export interface ProductData{
  data?:{
    id?:number,
    attributes?:{
      Name?:string,
      SKU?:string,
      Description?:string,
      
    }
  }
}


export interface AttributesData{
  
  OrderId?:string ;
  Brand?:string,
    Amount?:number,
    Status?:string;
    DiscountType?:string,
    DiscountPercent?:number
  retailer?:Retailer,
    users?:number,
    
    Comments?:Comments[],
    createdAt?:string,
    ProductDetails?:ProductDetail[]
    
}

export interface ProductDetail{
  Qty88?:number|null|undefined,
  Qty90?:number|null|undefined,
  UnitPrice?:number|null,
   TotalPrice?: number | null|undefined
   product?:ProductData
}


export interface Retailer{
  data?:{
    id?:number,
    attributes?:{
      Name?:string,
      Address?:string,
      
    }
  }
}
