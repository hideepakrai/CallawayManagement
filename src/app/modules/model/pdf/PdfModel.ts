export interface PdfModel{
    brand_id?: number;
    created_at?: string;
    discount_percent?: number;
    discount_type?: string;
    id?: number;
    items?:string;
    key: number;
    manager_id?: number;
    manager_name?: string;
    note?: string;
    order_date?: string;
    retailer_address?: string;
    retailer_gstin?: string;
    retailer_id?: number;
    retailer_name?: string;
    retailer_phone?: string;
    salesrep_id?: number;
    salesrep_name?: string;
    status?: string;
    total_value?: number;
    updated_at?: string;
    user_id?: number;
    total_val_pre_discount?:number,
    discount_amount?:number

      
      
}
