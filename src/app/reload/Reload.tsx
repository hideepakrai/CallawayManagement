import React from 'react'
import { useState, useEffect } from 'react'

import {getCurrentUser,getAdminToken,
  getUserAccount,
  getUserOrders,addUser,
  addUserAccount} from "../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from 'react-redux'

import {getTravisProducts,getCategory,getStyleCode,getOtherProducts} from "../slice/allProducts/TravisMethewSlice";
import {getOgioProducts} from "../slice/allProducts/OgioSlice"

import { useAuth } from '../modules/auth/core/Auth'
import { parse } from 'path';
const Reload = () => {
    const dispatch = useDispatch();
    const { saveAuth, setCurrentUser } = useAuth()
    const getCurrentUsers= useSelector(getCurrentUser);
    const getAdminTokens= useSelector(getAdminToken);
    const getUserAccounts= useSelector(getUserAccount);
    // const getUserInfos= useSelector(getUserInfo);
    const getUserOrder= useSelector(getUserOrders);
    const getTravisProduct= useSelector(getTravisProducts)
   const getOgioProduct = useSelector(getOgioProducts)
    const getOtherProduct = useSelector(getOtherProducts)
    const getCategorys = useSelector(getCategory)
    const getStyleCodes = useSelector(getStyleCode)
    useEffect(()=>{
      // eslint-disable-next-line no-debugger
      debugger
     if(getCurrentUsers &&
         getUserAccounts&&
         getAdminTokens &&
         getOgioProduct

        ){
            localStorage.setItem('getCurrentUsers',JSON.stringify(getCurrentUsers))
            localStorage.setItem('getAdminTokens',JSON.stringify(getAdminTokens))
            localStorage.setItem('getUserAccounts',JSON.stringify(getUserAccounts))
          
           
     } 
     

    },[getCurrentUsers,
      getAdminTokens,
      getUserAccounts
      ]);



   
  return (
    <div></div>
  )
}

export default Reload