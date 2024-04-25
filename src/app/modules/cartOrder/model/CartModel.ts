export interface CartModel{
    id?:number,
    brand?:string,
    Brand?:Brand[],
    Name?: string;
    Description?: string;
    SKU?: string;
    StockManagement?: boolean;
    StockStatus?: string;
    MRP?: number;
    SalePrice?: number | null;
    Amount?: number;
    Stock88?:number|null;
    Stock90?:number|null;
    TotalQty?: number|null;
    Quantity88?: number|null;
    Quantity90?: number|null;
    TravisAttributes?: TravisMathewAttribute[] ,
    OgiAttributes?:OgioModel[],
}

export interface Brand {
    data: {
      attributes: {
        Name?: string;
      };
    };
  }

  export interface TravisMathewAttribute {
    StyleCode?:string | null;
    Length?:string | null;
    Category?:string | null;
    Season?:string | null;
    Line?:string | null;
    Color?:string | null;
    ColorCode?:string | null;
    __typename?:string | null;
    Gender?:string | null;
    Size?:string | null;
  }

  export interface OgioModel{
    id?:number;
    ProductType?:string | null;
    Category?:string | null;
    ProductModel?:string | null;
    LifeCycle?:string | null;
  }