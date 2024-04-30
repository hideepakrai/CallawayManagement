export interface CartModel{
  orderId?:string ;
    Status?:string;
    ProductDetails?:ProductDetails[],
    retailer?:number,
    users?:number,
    Brand?:string,
    Amount?:number,
    Comments?:Comments[]

}


export interface ProductDetails{
   product?: number|null|undefined,
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
