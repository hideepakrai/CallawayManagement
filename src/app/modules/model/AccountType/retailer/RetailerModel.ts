export interface RetailerModel{
    role?: string;
    phone?: number;
    phone2?:number,
    id?:number,
   user_id?:number,
   name?:string,
   address?:string,
   gstin?:string,
   code?:string,
   email?:string,
   secondary_email?:string,
   manager_id?:number,
   type?:string,
   photo_url?:string,
   thumbnail_url?:string,
   manager_name?:string,
   password?:string,
   password_hash?:string
}


export interface Details{
    Name?: string | null;
    Address?: string | null|undefined;
    Retailers?:Retailers;

}

export interface Retailers{
  data?: [
    {
        id?:number,
        attributes?:{
            Details?:[
                {
                    username?:string,
                    email?:string,
                    
                }
            ]
        }
        __typename?:string;
    }
  ]
}
export interface Retailer {
    Name?: string | null;
    Address?: string | null|undefined;
    Phone?: string | null;
    Phone2?: string | null;
    Email?: string | null;
    GST?: string;
    Type?: string;
    Location?: string | null;
    Website?: string | null;
    sales_representatives?: sales_representatives[];
    managers?: managers[];
    __typename?: string;
}



    export interface sales_representatives{
        id?:number,
        attributes?:salesRepresentatives[];
        __typename?:string;
    }

    export interface managers{
        id?:number,
        attributes?:manager[]
        __typename:string;
    }

    export interface salesRepresentatives{
        Name?:string | null;
    }

    export interface manager{
        Name?:string | null;
    }