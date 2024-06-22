import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { GET_OGIO_Prduct } from "../../../modules/brands/ogio/graphql/OgioGraphQl"
import {  addOgioProduct, updateCheckAvailability } from "../../../slice/allProducts/OgioSlice"
import axios from 'axios';
import { GetOgioProduct } from "../ogio/OgioAPI"
import { OgioBasicModel } from '../../../modules/model/ogio/OgioBrandModel';

type Props = {

    resetFail: (val:string) => void,
    resetSubmit: () => void,
    checkSku: OgioBasicModel[]
}

const RefetchOgio = ({ checkSku, resetSubmit,resetFail }: Props) => {


    const dispatch = useDispatch();
    useEffect(() => {
        if(checkSku && checkSku.length>0){
        getAllOgioProduct()
        }
    }, [checkSku])

    const getAllOgioProduct = async () => {
        try {
            const response = await GetOgioProduct();
              let fail=true;
              let val="";
            if (response  &&fail) {
                dispatch(addOgioProduct({
                    travisProduct: response
                }))
               
                checkSku.map((items) => {

                    if(items.error===""){
                        const checkIndex = response.findIndex((item: OgioBasicModel) => item.sku === items.sku);
                     
                    if (
                        checkIndex !== -1 &&
                        response[checkIndex].stock_90 < (items.Quantity90 ?? 0)  &&
                        val === ""
                    ) {
                        fail = false;
                        val = items.sku ?? "";
                        dispatch(updateCheckAvailability({
                            sku:items.sku ?? "",
                            qty:response[checkIndex].stock_90 
                        }))
                    }
                    }
                    
                });
                
                
                if(!fail){
                    
                    resetFail(val);
                }else {
                    resetSubmit()
                }
                 
            }


        } catch (err) {
            // alert("Error in getting ogio product")
        }

    }





    return (
        <div></div>
    )
}

export default RefetchOgio;
