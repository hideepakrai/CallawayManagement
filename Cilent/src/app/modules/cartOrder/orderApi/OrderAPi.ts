import axios from "axios";
import { CartModel } from "../../model/CartOrder/CartModel";

const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;

export function CreateOrder(data: CartModel) {
    const payload = {
        data: data // Include the 'data' field with the order information
    };

    return axios.post(`${STRAPI_URL}/api/orders`, payload)
        .then(response => {
           
            return response.data;
        })
        .catch(err => {
            console.error("Error creating order:", err);
            throw err;
        });
}
