import { NumberFormat } from "xlsx";

export interface ExcelModelApparel {   
    Brand?: number;
    brand?: string;
     SKU?: string;
     Name?: string;
     Category?:string | null;
    Season?:string | null;
    StyleCode?:string | null;
    ColorCode?:string | null;
    Color?:string | null;
    Size?:string | null;
     Description?: string;
     SetType?: string;
     MRP?: number| null;
     Length?:string | null;
     Line?:string | null;
     StockManagement?: boolean;
     StockStatus?: string;
     GST?:number;
     Gender?:string | null;
     ProductType?: string | null;
     Stock88?:number|null;
      Stock90?:number|null;
      TotalQty?: number|null;
      Quantity88?: number;
      Quantity90?: number;
    
    

}