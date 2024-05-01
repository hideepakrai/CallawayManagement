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
    attributes?: {
      Brand?: string;
      OrderId?:number;
      Status?:string;
      createdAt?:string;
    }

  }
  
  // Define additional interfaces as needed
  
  