
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
 const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL

export function GetOgioProduct () {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1MTUwMTI1LCJleHAiOjE3MTc3NDIxMjV9.2ED-jWFAKeqAxlKjpOXldH0iwcU5yCvsaugtzPz7Kh0"
    const headers = {
        Authorization: `Bearer ${token}` // Add the Auth token to the headers
      };
     
      return axios.get(`${STRAPI_URL}/api/products`,{headers})
      .then(response=>{
        console.log(response)
        return response.data
    }).catch(error=>{
        throw error;
    });

    
}



