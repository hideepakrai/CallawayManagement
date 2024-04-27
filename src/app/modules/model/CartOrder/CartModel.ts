export interface CartModel{
  orderId?:string ;
    Status?:string;
    ProductDetails?:ProductDetails[]

}


export interface ProductDetails{
   product: number|null|undefined,
    Quantity: number | null | undefined,
    TotalPrice: number | null|undefined,
    UnitPrice: number | null|undefined
}
