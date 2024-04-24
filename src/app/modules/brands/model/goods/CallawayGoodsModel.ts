
export interface BasicModelGoods {

    id?:number,
      Name?: string;
      Description?: string;
      SKU?: string;
      StockManagement?: boolean;
      StockStatus?: string;
      RegularPrice?: number;
      SalePrice?: number | null;
      StockAvailable?: number;
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
      Gallery?:ImageType
      AttributeSet?:GoodsAttributes[],
      GoodsAttributes?: GoodsAttributes [] 
      Quantity?: number;
      Amount?: number;
    
   

}
export interface BasicModelGoodsGraph {

    id?:number,
    attributes:BasicModelGoods
  }
 

export interface GoodsAttributes {
              ProductType?:string;
              ProductModel?:string | null;
              Category?:string | null;
              Orientation?:string | null;
              LifeCycle?:string | null;
              Material?:string | null;
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

