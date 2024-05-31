import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { GET_OGIO_Prduct } from "../../../modules/brands/ogio/graphql/OgioGraphQl"
import { addOgioProduct } from "../../../slice/allProducts/OgioSlice"
import axios from 'axios';
import { GetOgioProduct } from "../ogio/OgioAPI"

type Props = {

    resetOgio: () => void,
    isRefetch: boolean
}

const OgioProduct = ({ resetOgio, isRefetch }: Props) => {


    const dispatch = useDispatch();
    useEffect(() => {
        getAllOgioProduct()
    }, [isRefetch])

    const getAllOgioProduct = async () => {
        try {
            const response = await GetOgioProduct();
            console.log("all ogio product recieved ", response)
            if(response.status === 200) {
                dispatch(addOgioProduct({
                    ogioProduct: response.data
                }));
            }
          
            resetOgio();


        } catch (err) {
            // alert("Error in getting ogio product")
        }

    }





    return (
        <div></div>
    )
}

export default OgioProduct;
