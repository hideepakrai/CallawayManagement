import axios from "axios";
import { CartModel } from "../../model/CartOrder/CartModel";

const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;
export function CreateOrder(data: CartModel) {
    

    return axios.post(`${serverUrl}/add-order`, data)
        .then(response => {
           
            return response.data;
        })
        .catch(err => {
            console.error("Error creating order:", err);
            throw err;
        });
}
