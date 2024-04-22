
export interface BasicModel {

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
      AttributeSet?:[],
      OgiAttributes?:OgioModel,
      TravisMathewAttributes?:TravisMathewModel
      GoodsAttributes?: GoodsAttributes 
    
   

}
export interface BasicModelGraph {

    id?:number,
    attributes:BasicModel
  }
 


export interface OgioModel{
  id:number;
  ProductType:string | null;
  Category:string | null;
  ProductMode:string | null;
  LifeCycle:string | null;
}


export interface TravisMathewModel{
  StyleCode?:string | null;
  Length?:string | null;
  Category?:string | null;
  Season?:string | null;
  Line?:string | null;
  Color?:string | null;
  ColorCode?:string | null;
}


export interface GoodsAttributes {
              ProductType:string;
              ProductModel:string | null;
              Category:string | null;
              Orientation:string | null;
              LifeCycle:string | null;
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

 

  export interface BrandType {
    id: number;
    Name: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }