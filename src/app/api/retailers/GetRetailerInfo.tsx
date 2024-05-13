import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_Retailer_ACCOUNT} from "../../grapgQl/RetailerAccount"
import {addRetailer} from "../../slice/retailer/RetailerSlice"
//import {addUserInfo} from "../../slice/UserSlice/UserSlice"
import {useAuth} from '../../modules/auth/core/Auth'
type Props = {
  
    resetRetailer:()=>void,
    userRoleId:number
}

const GetRetailerInfo = ({ userRoleId,resetRetailer}: Props) => {

    const {setCurrentUser} = useAuth()   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_Retailer_ACCOUNT, {
        variables: {
            userId:userRoleId
        },
        fetchPolicy: 'no-cache',
      });
      

// useEffect(() => {
//      console.log("Retailers",data);
//     // console.log(loading);
//     if (data && !loading) {
//         dispatch(addUserInfo({
//             UserInfo:data?.retailers.data[0]?.attributes
//         }))
        
//         setCurrentUser(data)
//     resetRetailer();
//     }
// }, [data, loading]);


    return (
        <div></div>
    )
}

export default GetRetailerInfo;
