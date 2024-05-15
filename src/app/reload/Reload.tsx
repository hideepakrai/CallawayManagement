import React from 'react'
import { useState, useEffect } from 'react'

import {getCurrentUser,getAdminToken,
  getUserAccount,
  getUserOrders,addUser,
  addUserAccount} from "../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from 'react-redux'

import {getTravisProducts,getCategory,getStyleCode,getOtherProducts} from "../slice/allProducts/TravisMethewSlice";
import {addOgioProduct, getOgioProducts} from "../slice/allProducts/OgioSlice"

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
     
     if(getCurrentUsers &&
         getUserAccounts&&
         getAdminTokens &&
         getOgioProduct

        ){
            localStorage.setItem('getCurrentUsers',JSON.stringify(getCurrentUsers))
            localStorage.setItem('getAdminTokens',JSON.stringify(getAdminTokens))
            localStorage.setItem('getUserAccounts',JSON.stringify(getUserAccounts))
            localStorage.setItem('getOgioProduct',JSON.stringify(getOgioProduct))
           
     }  else if(getCurrentUsers && 
      getCurrentUsers.length === 0 &&
      getUserAccounts &&
      getOgioProduct &&getOgioProduct.length === 0) {
9
        
         dispatch(addUser({
          currentUser:JSON.parse(localStorage.getItem('getCurrentUsers') as string),
          UserAccount:JSON.parse(localStorage.getItem('getCurrentUsers') as string),
          adminToken: JSON.parse(localStorage.getItem('getAdminTokens') as string)
         }))
        dispatch(addOgioProduct({
          ogioProduct:JSON.parse(localStorage.getItem('getOgioProduct') as string)
        }))
  
     }
     

    },[getCurrentUsers,
      getAdminTokens,
      getUserAccounts,getOgioProduct
      ]);



   
  return (
    <div></div>
  )
}

export default Reload