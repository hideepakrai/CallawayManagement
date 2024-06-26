import axios, { AxiosResponse } from "axios";

import { ExcelModelTravis } from "../../../model/travis/TravisExcel";
import { BasicModelTravis, UpdateTravisModel } from "../../../model/travis/TravisMethewModel";
import { UploadImageModel } from "../../../model/uploadImage/UploadImageModel";
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl = import.meta.env.VITE_APP_MY_SERVER_URL;
// get USer Role 
export function UpdateTravisProduct(data: BasicModelTravis[]) {
  const update = data
  return axios.post(`${serverUrl}/update-travis`, update,
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


export function AddNewProduct(data: BasicModelTravis[]) {
  const newData = data
  return axios.post(`${serverUrl}/add-travis`, newData,
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
export function UpDateTravisQty(data: BasicModelTravis[]) {

  return axios.post(`${serverUrl}/update-travis-qty`, data,
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
export function UpDateTravisImages(data: UploadImageModel) {
  return axios.post(`${serverUrl}/update-travis-images`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}
export function NoTravisImages(data: UploadImageModel) {
  return axios.post(`${serverUrl}/no-travis-images`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}