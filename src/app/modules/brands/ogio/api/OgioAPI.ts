import axios from "axios";
export const serverUrl = import.meta.env.VITE_APP_MY_SERVER_URL;
import { ExcelModelTravis } from "../../../model/travis/TravisExcel";
import { OgioBasicModel, OgioUploadDataModel } from "../../../model/ogio/OgioBrandModel";
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;

// get USer Role 
export function AddOgioProduct(data: OgioBasicModel[]) {
  const newData = data
  return axios.post(`${serverUrl}/add-ogio`, newData,

  )
    .then(response => {
      return response
    }).catch(error => {
      throw error;
    });


}


export function UpdateOgioProduct(data: OgioBasicModel[]) {
  const addData = data
  return axios.post(`${serverUrl}/update-ogio`, addData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(response => {
      return response
    }).catch(error => {
      throw error;
    });

}

export function UpdateStockQuantity(allData: OgioBasicModel[]) {

  return axios.post(`${serverUrl}/update-ogio-qty`, allData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(response => {
      return response
    }).catch(error => {
      throw error;
    });

}

export function UpDateOgioQty(data: OgioBasicModel[]) {

  return axios.post(`${serverUrl}/update-ogio-qty`, data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(response => {
      return response
    }).catch(error => {
      throw error;
    });

}
export function UpDateOgioImages(data: OgioBasicModel[]) {

  return axios.post(`${serverUrl}/update-ogio-images`, data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(response => {
      return response
    }).catch(error => {
      throw error;
    });

}