import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { GetCallawayApprealProduct } from './CallawayAppreal';
import { addCallawayApparelProduct } from '../../../../slice/allProducts/CallawayApparelSlice';
import { BasicModelApparel } from '../../../../modules/model/apparel/CallawayApparelModel';

type Props = {

    resetFail: (val:string) => void,
    checkSku:BasicModelApparel[],
    resetSubmit:()=>void
}

const SoftGoodRefetch = ({ resetFail ,checkSku,resetSubmit }: Props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    if(checkSku){
        getAllApparelProduct()
    }
   
  }, [checkSku])


  const getAllApparelProduct = async () => {
    try {
        let fail=true;
        let val="";
      const response = await GetCallawayApprealProduct();
       
      const products: BasicModelApparel[] = response;
           
      
      if (response &&fail ) {

        dispatch(addCallawayApparelProduct({
          apparelProduct: response

        }))

           checkSku.map((items) => {
                    if(items.error88===""){
                        const checkIndex = response.findIndex((item: BasicModelApparel) => item.sku === items.sku);
                 
                      
                    if (
                        checkIndex !== -1 &&
                        response[checkIndex].stock_88 < (items.Quantity88 ?? 0)  &&
                        val === ""
                    ) {
                        fail = false;
                        val = items.sku ?? "";
                        // dispatch(updateCheckAvailability({
                        //     sku:items.sku ?? "",
                        //     qty:response[checkIndex].stock_88 
                        // }))
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
    resetFail("some thing went wrong")
    }

  }

  return (

    <div></div>

  );
}

export default SoftGoodRefetch