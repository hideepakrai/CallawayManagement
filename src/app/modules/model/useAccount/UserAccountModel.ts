 export interface UserAccountModel {
  id?:number|undefined|null
    email?: string|undefined|null;
    designation?:string|undefined|null;
    name?:string|undefined|null;
    phone?:string|undefined|null;
    reporting_manager_id?:string|undefined|null;
    role?:string|undefined|null;
    user_id?:number;
    photo_url?:string;

  }
  

  export interface DetailData{

  }

  export interface UserRoleAttributes {
    role?: UserRole;
    orders?:AllOrderss;
    username?: string;
    manager?:managerData;
    retailer?:RetailerData;
    retailers?:RetailerData;
  }

  export interface managerData{
    data?:{
      id?:number,
      attributes?:{
        
            username?:string,
            email?:string,
            
          }
       
    }
    
  }
  export interface RetailerData{
    data?:{
      id?:number,
      attributes?:{
        
            username?:string,
            email?:string,
            
          }
       
    }
    
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
    retailers?:retailerData
       

    
  
  }

  export interface retailerData{
    data?:RetailerModels[]
      

  }

  export interface RetailerModels{
    id?:number;
    attributes?:{
      Name?:string;
        Address?:string;
        Phone?:string;
        Phone2?:string;
        GST?:string;
        Location?:string;
        users_permissions_user?:{
          data?:{
            id?:number;
            attributes?:{
              username?:string;
              email?:string;
            }
          }
        }

    }
    
  }
  
  // Define additional interfaces as needed
  
  