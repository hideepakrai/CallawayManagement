export interface OgioExcelModel {

    id?:number,
     Brand?:number
      Name?: string;
      Description?: string;
      SKU?: string;
      MRP?: number;
      SalePrice?: number | null;
      
      SetType?: string;
      ProductType?:string | null;
      Category?:string | null;
      ProductModel?:string | null;
      LifeCycle?:string | null;
      Stock90?:number|null;
      TotalQty?: number|null;
      
     

}