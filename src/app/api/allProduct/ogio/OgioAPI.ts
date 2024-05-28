
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL
const serverApi = import.meta.env.VITE_APP_MY_SERVER_URL

export function GetOgioProduct() {



    return axios.get(`${serverApi}/get-ogio`,)
        .then(response => {
            return response
        }).catch(error => {
            throw error;
        });


}



