import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch, useSelector } from 'react-redux';
import { GET_TRAVISMETHEW_Prduct } from "../../../modules/brands/travisMethew/graphQl/TravisMethewProducts"
import { addTravisProduct, getTravisProducts } from "../../../slice/../slice/allProducts/TravisMethewSlice"
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

               
                checkSku.map((items)=>{
                  const check=response.findIndex((item:BasicModelTravis)=>item.sku==items.sku)
                  if(check  && check.stock_88!=items.stock_88 && check.stock_99!=items.stock_90 && val===""){
                    fail=false;
                    val=items.sku??"";
                  }
              })
                
                if(!fail){
                    dispatch(addTravisProduct({
                        travisProduct: response
                    }))
                    resetFail(val);
                }else if (fail){
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

export default RefetchTravis;
