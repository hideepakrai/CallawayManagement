export interface CurentUser{
   id?: number;
   email?:string;
   code?:string;
   password_hash?:string;
   role?:string;
   status?:string;
   created_at?:string;
   updated_at?:string;
   manager_id?:number

}

export interface UserData{
    blocked?:boolean;
confirmed?:boolean;
id?:number;
emial?:string;
username?:string;

}