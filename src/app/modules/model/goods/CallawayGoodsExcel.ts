export interface ExcelModelGoods {   
     Brand?: string;
      SKU?: string;
      Name?: string;
      Description?: string;
      SetType?: string;
      StockAvailable?: number;
      MRP?: number;
      ProductType?: string | null;
      Category?:string | null;
      Orientation?:string | null;
      LifeCycle?:string | null; 
      ProductModel?:string | null;
      StockManagement?: boolean;
      StockStatus?: string;
      MRP?: number | null;  
      Material?: string | null;

}