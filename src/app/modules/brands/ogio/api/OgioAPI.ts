import axios from "axios";
export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;
import {ExcelModelTravis} from "../../../model/travis/TravisExcel";
import {OgioBasicModel,OgioUploadDataModel} from "../../../model/ogio/OgioBrandModel";
const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;

// get USer Role 
export function AddOgioProduct(data:OgioBasicModel){
    const newData=[data]
    return axios.post(`${serverUrl}/add-ogio`,newData,
    
    )
    .then(response=>{
      console.log(response)
      return response.data
  }).catch(error=>{
      throw error;
  });
  
  
  }


  export function UpdateOgioProduct(data: OgioBasicModel){
    const addData=[data]
    return axios.post(`${serverUrl}/update-ogio`,addData,
    {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response=>{
      console.log(response)
      return response.data
  }).catch(error=>{
      throw error;
  });

  }

  export function UpdateStockQuantity (allData:OgioBasicModel[]){
   
    return axios.post(`${serverUrl}//ogio/update-stock`,allData,
    {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response=>{
      console.log(response)
      return response.data
  }).catch(error=>{
      throw error;
  });

  }