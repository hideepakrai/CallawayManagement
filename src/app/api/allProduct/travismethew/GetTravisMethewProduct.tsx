import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_TRAVISMETHEW_Prduct} from "../../../modules/brands/travisMethew/graphQl/TravisMethewProducts"
import {addTravisProduct} from "../../../slice/../slice/allProducts/TravisMethewSlice"
type Props = {
  
    resetTravis:()=>void
}

const GetTravisMethewProduct = ({ resetTravis}: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_TRAVISMETHEW_Prduct, {
        variables: {
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
    // console.log("Travis data graph QL",data);
    // console.log(loading);
    if (data && !loading) {
        // console.log(data?.products?.data);
        
        dispatch(addTravisProduct({
            travisProduct: data?.products?.data,
            id: data?.products?.data.id
        }));
        resetTravis();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default GetTravisMethewProduct;
