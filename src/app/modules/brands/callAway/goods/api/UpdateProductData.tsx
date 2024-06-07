import axios, { AxiosResponse } from "axios";

import { ExcelModelGoods } from "../../../../model/goods/CallawayGoodsExcel";
//import { BasicModelGoods, UpdateTravisModel } from "../../../model/travis/TravisMethewModel";
import { BasicModelGoods} from "../../../../model/goods/CallawayGoodsModel";
import { UploadImageModel } from "../../../../model/uploadImage/UploadImageModel";
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl = import.meta.env.VITE_APP_MY_SERVER_URL;
// get USer Role 
export function UpdateGoodsProduct(data: BasicModelGoods[]) {
   const update = data
   return axios.post('${serverurl}/update-goods', update,
   {
    headers: {
        "Content-Type": "application/json"
    },
   }
)
  .then(response =>{
    return response
  }).catch(error =>{
    throw error;
  });
}


export function AddNewProduct(data: BasicModelGoods[]) {
    const newData = data
    return axios.post(`${serverUrl}/add-goods`, newData,
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
  export function UpDateGoodsQty(data: BasicModelGoods[]) {
     console.log("api",data)
    return axios.post(`${serverUrl}/update-goods-qty`, data,
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
  export function UpDateGoodsImages(data: UploadImageModel) {
    return axios.post(`${serverUrl}/update-goods-images`, data, {
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
  export function NoGoodsImages(data: UploadImageModel) {
    return axios.post(`${serverUrl}/no-goods-images`, data, {
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