 export interface UserAccountModel {
    email?: string|undefined|null;
    provider?: string|undefined|null;
    attributes?: UserRoleAttributes
    
    username?: string;
  }
  

  export interface UserRoleAttributes {
    role: UserRole;
  }
   export interface UserRole {
    data: UserRoleData;
  }
  
  interface UserRoleData {
    attributes: RoleAttributes;
  }

  interface RoleAttributes{
    name: string;
  }
  
 
  
  // Define additional interfaces as needed
  
  