import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch, useSelector } from 'react-redux';
//import { GET_TRAVISMETHEW_Prduct } from "../../../modules/brands/travisMethew/graphQl/TravisMethewProducts"
import { addCallawayGoodsProduct, getGoodsProducts, updateCheckAvailability } from "../../../../slice/allProducts/CallAwayGoodsSlice"
import { GetAllCallawayGoodsProduct } from './GetCallawayGoodsApi';
import { BasicModelGoods } from '../../../../modules/model/goods/CallawayGoodsModel';
type Props = {

    resetFail: (val:string) => void,
    checkSku:BasicModelGoods[],
    resetSubmit:()=>void
}

const RefetchHardGoods = ({ resetFail ,checkSku,resetSubmit}: Props) => {

    const getProduct: BasicModelGoods[] = useSelector(getGoodsProducts)
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
            const response = await GetAllCallawayGoodsProduct();
            const products: BasicModelGoods[] = response;
           
            if (response &&fail) {
                dispatch(addCallawayGoodsProduct({
                    travisProduct: response
                }))
               
                checkSku.map((items) => {
                    if(items.error88===""){
                        const checkIndex = response.findIndex((item: BasicModelGoods) => item.sku === items.sku);
                 
                      
                    if (
                        checkIndex !== -1 &&
                        response[checkIndex].stock_88 < (items.Quantity88 ?? 0)  &&
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

export default RefetchHardGoods;
