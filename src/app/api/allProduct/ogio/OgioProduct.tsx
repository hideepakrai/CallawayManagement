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

   
    const dispatch= useDispatch()  ;
    useEffect(()=>{
        getAllOgioProduct()
    },[isRefetch])

    const getAllOgioProduct =async()=>{
  console.log("Getting")
 try{
       const response= await GetOgioProduct ();
       console.log("ogio product",response)
       dispatch(addOgioProduct({
                    ogioProduct: response
                }));
                resetOgio();
       

 } catch(err){
   // alert("Error in getting ogio product")
   console.log("error",err
    
   )
 }
        
    }
   




    return (
        <div></div>
    )
}

export default OgioProduct;
