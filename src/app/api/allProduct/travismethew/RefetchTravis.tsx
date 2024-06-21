import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch, useSelector } from 'react-redux';
import { GET_TRAVISMETHEW_Prduct } from "../../../modules/brands/travisMethew/graphQl/TravisMethewProducts"
import { addTravisProduct, getTravisProducts, updateCheckAvailability } from "../../../slice/../slice/allProducts/TravisMethewSlice"
import { GetTravisProduct } from './TravisProduct';
import { BasicModelTravis } from '../../../modules/model/travis/TravisMethewModel';
type Props = {

    resetFail: (val:string) => void,
    checkSku:BasicModelTravis[],
    resetSubmit:()=>void
}

const RefetchTravis = ({ resetFail ,checkSku,resetSubmit}: Props) => {

    const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
    const dispatch = useDispatch();
    useEffect(() => {
        if(checkSku && checkSku.length>0){
            getAllTravisProduct()
        }
       
    }, [checkSku])

    const getAllTravisProduct = async () => {
        try {
            let fail=true;
            let val="";
            const response = await GetTravisProduct();
            const products: BasicModelTravis[] = response;
           
            if (response &&fail) {
                dispatch(addTravisProduct({
                    travisProduct: response
                }))
               
                checkSku.map((items) => {
                    if(items.error88===""){
                        const checkIndex = response.findIndex((item: BasicModelTravis) => item.sku === items.sku);
                      console.log("checkIndex",checkIndex)
                      // eslint-disable-next-line no-debugger
                      debugger
                    if (
                        checkIndex !== -1 &&
                        response[checkIndex].stock_88 <= (items.Quantity88 ?? 0)  &&
                        val === ""
                    ) {
                        fail = false;
                        val = items.sku ?? "";
                        dispatch(updateCheckAvailability({
                            sku:items.sku ?? "",
                            qty:response[checkIndex].stock_88 
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
            resetFail("some thing went wrong")
            // alert("Error in getting ogio product")
        }

    }




    return (
        <div></div>
    )
}

export default RefetchTravis;
