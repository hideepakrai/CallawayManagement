export interface CartModel{
  orderId?:string ;
  OrderId?:string ;
    Status?:string;
    ProductDetails?:ProductDetails[],
    productDetails?:ProductCard[]
    retailer?:number,
    users?:{
      connect?:ConnectData[]
    },
    Brand?:string,
    Amount?:number,
    Comments?:Comments[]
    createdAt?:string,
    DiscountType?:string,
    DiscountPercent?:number,

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

export interface AccountOrder{
  id?:number
  attributes?:AttributesData;
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
