import axios, { AxiosResponse } from "axios";
import { ExcelModelApparel} from "../../../../model/apparel/ApparelExcel";
//import { BasicModelApparel, UpdateTravisModel } from "../../../model/travis/TravisMethewModel";
import { BasicModelApparel } from "../../../../model/apparel/CallawayApparelModel";
import { UploadImageModel } from "../../../../model/uploadImage/UploadImageModel";

const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl = import.meta.env.VITE_APP_MY_SERVER_URL;
// get USer Role 
export function UpdateApparelProduct(data: BasicModelApparel[]) {
  const update = data
  return axios.post(`${serverUrl}/update-apparel`, update,
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


export function AddNewProduct(data: BasicModelApparel[]) {
  const newData = data
  return axios.post(`${serverUrl}/add-apparel`, newData,
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
export function UpDateApparelQty(data: BasicModelApparel[]) {

  return axios.post(`${serverUrl}/update-apparel-qty`, data,
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
export function UpDateApparelImages(data: UploadImageModel) {
  return axios.post(`${serverUrl}/update-apparel-images`, data, {
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
export function NoApparelImages(data: UploadImageModel) {
  return axios.post(`${serverUrl}/no-apparel-images`, data, {
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