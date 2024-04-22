import { NumberFormat } from "xlsx";

export interface ExcelModelTravis {   
    Brand?: number;
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
     RegularPrice?: number;
     StockAvailable?: number;
     Length?:string | null;
     Line?:string | null;
     StockManagement?: boolean;
     StockStatus?: string;
     SalePrice?: number | null;  
     Gender?:string | null;
     ProductType?: string | null;
    

}