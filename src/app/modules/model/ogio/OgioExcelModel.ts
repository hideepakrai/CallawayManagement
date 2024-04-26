export interface OgioExcelModel {

    id?:number,
     Brand?:number
      Name?: string;
      Description?: string;
      SKU?: string;
      StockManagement?: boolean;
      StockStatus?: string;
      MRP?: number;
      SalePrice?: number | null;
      StockAvailable?: number;
      SetType?: string;
      ProductType?:string | null;
      Category?:string | null;
      ProductModel?:string | null;
      LifeCycle?:string | null;
     

}