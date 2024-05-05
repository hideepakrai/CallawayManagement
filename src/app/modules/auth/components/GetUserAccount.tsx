import React, { useEffect, useState } from 'react';
import { getUserRole } from "../core/_requests";
import { useSelector, useDispatch } from 'react-redux';
//import {getAdminToken}  from "../../../slice/UserSlice/UserSlice"

import { useQuery,useApolloClient } from "@apollo/client";
import {GET_User_ACCOUNT} from "../../../grapgQl/GetUSerAccount"
import {addUserAccount} from "../../../slice/UserSlice/UserSlice"
import {useAuth} from '../core/Auth'

type Props = {
    userId: number,
    resetId:()=>void
}

const GetUserAccount = ({ userId,resetId }: Props) => {

   
    const dispatch= useDispatch()
    const[user_Id, setUser_id]=useState<number>()
   

    const { loading, error,data,refetch } = useQuery(GET_User_ACCOUNT, {
        variables: {
            userId: userId,
        },
        fetchPolicy: 'network-only',
      });
      


      useEffect(()=>{

        console.log("user Account",data)
        console.log(loading )
        if(data &&!loading){
            console.log(data?.usersPermissionsUsers?.data[0]);
        
            dispatch(addUserAccount({
                UserAccount: data?.usersPermissionsUsers?.data[0],
            }))
           
            resetId()
        } 
      },[data, loading])

    return (
        <div>GetRole</div>
    )
}

export default GetUserAccount;
