import axios from "axios";

import {ExcelModelTravis} from "../../../model/travis/TravisExcel";
import {OgioBasicModel,OgioUploadDataModel} from "../../../model/ogio/OgioBrandModel";
const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;

// get USer Role 
export function UpdateOgioProduct(data:OgioUploadDataModel, id:number){

    return axios.put(`${STRAPI_URL}/api/products/${id}`,data,
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


  export function AddnewOgioProduct(data: OgioUploadDataModel){
    return axios.post(`${STRAPI_URL}/api/products`,data,
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