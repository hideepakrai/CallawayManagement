export interface OgioExcelModel {

    id?:number,
     Brand?:string,
      Name?: string;
      Description?: string;
      SKU?: string;
     
      MRP?: number | null;
      GST?:number;
      SetType?: string;
      ProductType?:string | null;
      Category?:string | null;
      ProductModel?:string | null;
      LifeCycle?:string | null;
      Stock90?:number|null;
      TotalQty?: number|null;
     


      
     

}

export interface UploadOgioExcel{
    id?:number,
     Brand?:number,
      Name?: string;
      Description?: string;
      SKU?: string;
     
      MRP?: number | null;
      GST?:number;
      SetType?: string;
      ProductType?:string | null;
      Category?:string | null;
      ProductModel?:string | null;
      LifeCycle?:string | null;
      Stock90?:number|null;
      TotalQty?: number|null;
}