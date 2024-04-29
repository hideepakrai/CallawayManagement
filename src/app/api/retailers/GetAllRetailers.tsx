import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_All_Retailer} from "../../grapgQl/GetAllRetailers"
import {addRetailer} from "../../slice/retailer/RetailerSlice"

type Props = {
  
    resetRetailer:()=>void
}

const GetAllRetailers = ({ resetRetailer}: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_All_Retailer, {
        variables: {
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
     console.log("Retailers",data);
    // console.log(loading);
    if (data && !loading) {
        dispatch(addRetailer({
            retailer:data?.retailers?.data
        }))
        
     
    resetRetailer();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default GetAllRetailers;
