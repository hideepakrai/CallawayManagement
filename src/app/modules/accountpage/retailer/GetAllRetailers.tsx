import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_ALL_RETAILERS} from "../retailer/retailerGRPQL/Retailergrpql"
import{addRetailer} from "../../../slice/retailer/RetailerSlice"

type Props = {
    
    resetRetailers:()=>void
}

const Manager = ({resetRetailers}:Props) => {


    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_ALL_RETAILERS, {
        variables: {
            
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
    //  console.log("All retailers",data);
    // console.log(loading);
    if (data && !loading) {

       
        dispatch(addRetailer({
            retailer:data?.retailers.data
        }))
        resetRetailers()
        
     
   // resetRetailer();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default Manager;
