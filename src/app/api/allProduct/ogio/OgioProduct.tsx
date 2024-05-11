import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_OGIO_Prduct} from "../../../modules/brands/ogio/graphql/OgioGraphQl"
import {addOgioProduct} from "../../../slice/allProducts/OgioSlice"
import axios from 'axios';
import {GetOgioProduct} from "../ogio/OgioAPI"

type Props = {
  
    resetOgio:()=>void,
    isRefetch:boolean
}

const OgioProduct = ({ resetOgio,isRefetch}: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_OGIO_Prduct, {
        variables: {
        
        },
        pollInterval: 10000,
        fetchPolicy: 'no-cache',
      });
      
  useEffect(()=>{
    if(isRefetch){
        refetch()
    }
  },[isRefetch])
     

useEffect(() => {
    console.log(data);
    console.log(loading);
    if (data && !loading) {
        // console.log(data?.products?.data);
        
        dispatch(addOgioProduct({
            ogioProduct: data?.products?.data,
            id: data?.products?.data.id
        }));
        resetOgio();
    }
}, [data, loading]);



    return (
        <div></div>
    )
}

export default OgioProduct;
