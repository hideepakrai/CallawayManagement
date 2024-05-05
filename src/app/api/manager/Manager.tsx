import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_All_Retailer} from "../../grapgQl/GetAllRetailers"
import {addUserInfo} from "../../slice/UserSlice/UserSlice"
import {useAuth} from '../../modules/auth/core/Auth'
type Props = {
    userRoleId:number
    resetmanagerid:()=>void
}

const Manager = ({userRoleId,resetmanagerid}:Props) => {

    const {setCurrentUser} = useAuth()
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_All_Retailer, {
        variables: {
            userId:userRoleId
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
     console.log("manager account",data);
    // console.log(loading);
    if (data && !loading) {

       
        dispatch(addUserInfo({
            UserInfo:data
        }))
        resetmanagerid()
         setCurrentUser(data)
     
   // resetRetailer();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default Manager;
