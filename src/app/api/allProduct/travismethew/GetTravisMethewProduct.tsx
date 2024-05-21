import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_TRAVISMETHEW_Prduct} from "../../../modules/brands/travisMethew/graphQl/TravisMethewProducts"
import {addTravisProduct} from "../../../slice/../slice/allProducts/TravisMethewSlice"
import { GetTravisProduct } from './TravisProduct';
import { BasicModelTravis } from '../../../modules/model/travis/TravisMethewModel';
type Props = {
  
    resetTravis:()=>void
}

const GetTravisMethewProduct = ({ resetTravis}: Props) => {

   
    const dispatch= useDispatch()  ;
    useEffect(()=>{
        getAllTravisProduct()
    },[])

    const getAllTravisProduct =async()=>{
//   console.log("Getting")
 try{
       const response= await GetTravisProduct ();
    //    console.log("Travis product",response)
       const products: BasicModelTravis[] = response
       if(response){
          dispatch(addTravisProduct({
            travisProduct: response
          }))
                    resetTravis();
       }
       
                
       

 } catch(err){
    // alert("Error in getting ogio product")
 }
        
    }
   



    return (
        <div></div>
    )
}

export default GetTravisMethewProduct;
