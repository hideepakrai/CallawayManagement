
export interface OgioBasicModel {

  sku?: string|undefined;
  brand_id?:number|null;
  name?:string|undefined;
  description?: string |undefined;
  mrp?: number | null;
  gst?:number,
  primary_image_url?:string;
  gallery_images_url?:string |undefined;
  product_type?:string;
  variation_sku?:string;
  stock_88?:number;
  stock_90?:number;
  category?:string;
  product_model?:string;
  Brand?:string|undefined



  SKU?: string|undefined;
      
     
      
      Amount?: number
      TotalQty?: number|null;
      Quantity88?: number|null;
       Quantity90?: number|null;
       ordered?: boolean, 
       LessGST?:number,
       Discount?:number,
       LessDiscountAmount?:number,
       NetBillings?:number,
       FinalBillValue?:number,
       error?:string,
}

export interface OgioBasicModelGraph {

    id?:number,
    attributes:OgioBasicModel
  }
 
  export interface OgioUploadDataModel{
    data?:OgioBasicModel
  }


export interface OgioModel{
  id?:number;
  ProductType?:string | null;
  Category?:string | null;
  ProductModel?:string | null;
  LifeCycle?:string | null;
  Stock90?:number|null;
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
  export interface Brand{
    data?: {
      attributes?: {
        Name?: string;
      };
    };
  }