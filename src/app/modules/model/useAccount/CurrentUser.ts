export interface CurentUser{
    jwt?: string;
    user?:UserData;
}

export interface UserData{
    blocked?:boolean;
confirmed?:boolean;
id?:number;
emial?:string;
username?:string;

}