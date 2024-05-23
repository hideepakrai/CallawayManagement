import React from 'react'
import { useState, useEffect } from 'react'

import {getCurrentUser,getAdminToken,
  getUserAccount,
  getUserOrders,addUser,
  addUserAccount,
  getUserRetailer,
  addUserRetailer} from "../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from 'react-redux'

import {getTravisProducts,getCategory,getStyleCode,getOtherProducts, addTravisProduct} from "../slice/allProducts/TravisMethewSlice";
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
    const getUserRetailers = useSelector(getUserRetailer)
    useEffect(()=>{
     
     if(getCurrentUsers &&
         getUserAccounts&&
         getAdminTokens &&
         getOgioProduct &&
         getTravisProduct

        ){
            localStorage.setItem('getCurrentUsers',JSON.stringify(getCurrentUsers))
            localStorage.setItem('getAdminTokens',JSON.stringify(getAdminTokens))
            localStorage.setItem('getUserAccounts',JSON.stringify(getUserAccounts))
            localStorage.setItem('getOgioProduct',JSON.stringify(getOgioProduct))
            localStorage.setItem('getTravisProduct',JSON.stringify(getTravisProduct))
           
     }  else if(getCurrentUsers && 
      getCurrentUsers.length === 0 &&
      getUserAccounts &&
      getOgioProduct &&getOgioProduct.length === 0 &&
      getTravisProduct &&getTravisProduct.length === 0
    ) {
9
        
         dispatch(addUser({
          currentUser:JSON.parse(localStorage.getItem('getCurrentUsers') as string),
          UserAccount:JSON.parse(localStorage.getItem('getCurrentUsers') as string),
          adminToken: JSON.parse(localStorage.getItem('getAdminTokens') as string)
         }))
        dispatch(addOgioProduct({
          ogioProduct:JSON.parse(localStorage.getItem('getOgioProduct') as string)
        }))
        dispatch(addTravisProduct({
          travisProduct:JSON.parse(localStorage.getItem('getTravisProduct') as string)
        }))
  
     }
     

    },[getCurrentUsers,
      getAdminTokens,
      getUserAccounts,getOgioProduct
      ]);


// reload userRetailer
useEffect(()=>{
  if(getUserRetailers  &&getUserRetailers.length>0){
    localStorage.setItem('getUserRetailers',JSON.stringify(getUserRetailers))

  } 
  else if (getUserRetailers && 
    getUserRetailers.length===0){
    dispatch(addUserRetailer({
      UserRetailer:JSON.parse(localStorage.getItem('getUserRetailers') as string)
    }))
  }
},[getUserRetailers])
   
  return (
    <div></div>
  )
}

export default Reload