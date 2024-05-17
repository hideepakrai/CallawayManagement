import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;
 const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
  export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;
// Server should return AuthModel
export function login(data:{
  // identifier: string,
  email: string,
  password: string
}) {

  const token = 'YOUR_JWT_TOKEN';
 // return axios.post(`${STRAPI_URL}/api/auth/local`, data
  return axios.post(`${serverUrl}/login`, data,
  
  ).then(response=>{
    console.log("login",response)
    return response.data;
  }).catch(err => {
    throw err;
  });
}



// fer retailers associati=ed with user
export function GetUserRetailer(id:number){
  

  const payload={
    managerId:id
  }
  // return axios.get(`${STRAPI_URL}/content-manager/collection-types/plugin::users-permissions.user/${data.userId}`,{headers})
  return axios.post(`${serverUrl}/get-retailer-associated`,payload)
  .then(response=>{
    console.log(response)
    return response.data
}).catch(error=>{
    throw error;
});


}

// Server should return AuthModel
export function register(data:{
  email: string,
  username: string,
  password: string,
 
}
 
) {
  return axios.post(`${STRAPI_URL}/api/auth/local/register`, data)
  .then(response=>{
    
    return response.data
}).catch(error=>{
    throw error;
});
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}

// get Admin Token
export function getAdminToken(data:{
  email:string,
  password:string
}){
  return axios.post(`${STRAPI_URL}/admin/login`,data)
  .then(response=>{
    console.log(response)
    return response?.data?.data?.token
}).catch(error=>{
    throw error;
});


}


// get USer Role 
export function getUserRole(data:{
  userId:number,
  token:string
  
}){
  const headers = {
    Authorization: `Bearer ${data.token}` // Add the Auth token to the headers
  };
  // return axios.get(`${STRAPI_URL}/content-manager/collection-types/plugin::users-permissions.user/${data.userId}`,{headers})
  return axios.get(`${STRAPI_URL}/content-manager/relations/plugin::users-permissions.user/${data.userId}/role?pageSize=5&page=1`,{headers})
  .then(response=>{
    console.log(response)
    return response.data
}).catch(error=>{
    throw error;
});


}
