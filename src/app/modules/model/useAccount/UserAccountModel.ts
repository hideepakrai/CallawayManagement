 export interface UserAccountModel {
    email: string;
    provider: string;
    role: UserRole;
    username: string;
  }
  
  interface UserRole {
    data: UserRoleData;
  }
  
  interface UserRoleData {
    attributes: UserRoleAttributes;
  }
  
  interface UserRoleAttributes {
    name: string;
  }
  
  // Define additional interfaces as needed
  
  