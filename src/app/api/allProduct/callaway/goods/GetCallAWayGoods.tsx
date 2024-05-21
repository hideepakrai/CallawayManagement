import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_Callaway_Goods_Prduct} from "../../../../modules/brands/callAway/goods/graphQl/GoodsQuery"
import {addCallawayGoodsProduct} from "../../../../slice/allProducts/CallAwayGoodsSlice"
type Props = {
  
    resetGoods:()=>void
}

const GetCallawayGoodsProduct = ({ resetGoods}: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_Callaway_Goods_Prduct, {
        variables: {
        
        },
        fetchPolicy: 'network-only',
      });
      

useEffect(() => {
    // console.log("CAllaway Goods,",data);
    // console.log(loading);
    if (data && !loading) {
        // console.log(data?.products?.data);
        
        dispatch(addCallawayGoodsProduct({
            goodsProduct: data?.products?.data,
            id: data?.products?.data.id
        }));
         resetGoods();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default GetCallawayGoodsProduct;
