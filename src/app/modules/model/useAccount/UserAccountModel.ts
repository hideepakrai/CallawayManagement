 export interface UserAccountModel {
    email?: string|undefined|null;
    provider?: string|undefined|null;
    attributes?: UserRoleAttributes
    
    username?: string;

  }
  

  export interface UserRoleAttributes {
    role?: UserRole;
    orders?:AllOrderss;
  }
   export interface UserRole {
    data?: UserRoleData;
  }
  
  export interface UserRoleData {
    attributes?: RoleAttributes;
  }

  export interface RoleAttributes{
    name?: string;
  }
  
  export interface AllOrderss{
    data?:OrderData[]
      
   
  }
 
  export interface OrderData{
    id?:number,
    attributes?: {
      
      Brand?: string;
      OrderId?:number;
      Amount?:number;
      Status?:string;
      DiscountType?:string;
      DiscountPercent?:string;
      createdAt?:string;
      retailer?:RetailerData;
    }

  }

  export interface RetailerData{
    data?:{
      id?:number;
      attributes?:{
        Name?:string;
        Address?:string;
      }
    }
  }
  
  // Define additional interfaces as needed
  
  