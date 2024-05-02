import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_All_BRANDS} from "../../grapgQl/GetBrandsGql"
import {addBrands} from "../../slice/brand/BrandSlice"
type Props = {
  
    resetBrands:()=>void
}

const GetAllBrands = ({ resetBrands}: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_All_BRANDS, {
        variables: {
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
     //console.log("addBrands",data);
     //console.log(loading);
    if (data && !loading) {
        dispatch(addBrands({
            brands:data?.brands?.data
        }))
        
     
        resetBrands();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default GetAllBrands;
