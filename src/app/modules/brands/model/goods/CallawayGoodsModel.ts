
export interface BasicModelGoods {

    id?:number,
    brand?:Brand[],
      Name?: string;
      Description?: string;
      SKU?: string;
      StockManagement?: boolean;
      StockStatus?: string;
      RegularPrice?: number;
      SalePrice?: number | null;
      StockAvailable?:StockAvailable[] ;
      SetType?: string;
      ProductType?: string | null;
      PrimaryImage?: ImageType,
      Gallery?:ImageType
      AttributeSet?:GoodsAttributes[],
      GoodsAttributes?: GoodsAttributes [] 
      Amount?: number;
      StockAvailable88?:number|null;
      StockAvailable90?:number|null;
      TotalQty?: number|null;
      Quantity88?: number|null;
       Quantity90?: number|null;
       ordered?: boolean
    
   

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
