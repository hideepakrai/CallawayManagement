import React, { useEffect, useState } from 'react';
import { useQuery,useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import {GET_User_Order} from "../../grapgQl/GetAllUserOrder"
import {addUserOrders} from "../../slice/UserSlice/UserSlice"
import {useAuth} from '../../modules/auth/core/Auth'
type Props = {
    userRoleId:number
    resetmanagerid:()=>void
}

const GetAllOrders = ({userRoleId,resetmanagerid}:Props) => {

    const {setCurrentUser} = useAuth()
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_User_Order, {
        variables: {
            userId:userRoleId
        
        },
        fetchPolicy: 'no-cache',
      });
      

useEffect(() => {
    
    // console.log(loading);
    // console.log("user Order",data);
    if (data && !loading) {

        // console.log("user Order",data?.usersPermissionsUsers?.data[0]?.attributes?.data);
        dispatch(addUserOrders({
            userOrders:data?.usersPermissionsUsers?.data[0]?.attributes?.orders.data

        }))
        resetmanagerid()
        //  setCurrentUser(data)
     
   // resetRetailer();
    }
}, [data, loading]);


    return (
        <div></div>
    )
}

export default GetAllOrders;
