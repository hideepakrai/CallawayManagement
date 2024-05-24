import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GetAllCallawayGoodsProduct} from "../../../../api/allProduct/callaway/goods/GetCallawayGoodsApi"
import {addCallawayGoodsProduct} from "../../../../slice/allProducts/CallAwayGoodsSlice"
import { BasicModelGoods } from '../../../../modules/model/goods/CallawayGoodsModel';
type Props = {
  
    resetGoods:()=>void
}

const GetCallawayGoodsProduct = ({ resetGoods}: Props) => {

    const dispatch= useDispatch()  ;
    useEffect(()=>{
        getAllGoodsProduct()
    },[])

    const getAllGoodsProduct =async()=>{
//   console.log("Getting")
 try{
       const response= await GetAllCallawayGoodsProduct ();
    //  console.log("goods product",response)
      
       if(response && response.productId){
          dispatch(addCallawayGoodsProduct({
            goodsProduct: response.productId

          }))
          resetGoods();
       }
       
                
       

 } catch(err){
    // alert("Error in getting ogio product")
    resetGoods()
 }
        
    }
   

      




    return (
        <div></div>
    )
}

export default GetCallawayGoodsProduct;
