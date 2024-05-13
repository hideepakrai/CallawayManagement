import axios from "axios";
export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;

const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;

// get USer Role 
export function GetUserOrder(userId:number, type:string){

    const data={
        id:userId,
        type:type
    }
   
    return axios.post(`${serverUrl}/get-user-orders`,data
    
    )
    .then(response=>{
      console.log(response)
      return response.data
  }).catch(error=>{
      throw error;
  });
  
  
  }
