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
   


    return (
        <div></div>
    )
}

export default GetRetailerInfo;
