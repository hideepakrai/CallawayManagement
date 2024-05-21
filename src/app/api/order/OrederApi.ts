
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
 const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL
 const serverApi= import.meta.env.VITE_APP_MY_SERVER_URL

export function GetAllUserOrders (user_id:number) {
   const payload = {
    id:user_id
   }
      return axios.post(`${serverApi}/get-user-orders`,payload)
      .then(response=>{
        // console.log(response)
        return response.data
    }).catch(error=>{
        throw error;
    });

    
}



