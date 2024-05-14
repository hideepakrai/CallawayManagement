
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
 const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL
 const serverApi= import.meta.env.VITE_APP_MY_SERVER_URL

export function GetTravisProduct () {
   
      return axios.get(`${serverApi}/get-travisMathew`,)
      .then(response=>{
        console.log(response)
        return response.data
    }).catch(error=>{
        throw error;
    });

    
}



