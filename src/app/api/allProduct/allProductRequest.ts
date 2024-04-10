import axios from "axios";
import {Products} from "./allProductModel";
const API_URL = import.meta.env.VITE_APP_STRAPI_URL;


export const getAllProdcutsURL=`${API_URL}/content-manager/collection-types/api::product.product?page=1&pageSize=100&sort=Name:ASC`



export function getAllProducts(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Include bearer token in the Authorization header
      }
    };
  
    return axios.get(getAllProdcutsURL, config);
  }