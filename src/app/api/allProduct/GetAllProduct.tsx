import React ,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getUserAccount} from "../../slice/UserSlice/UserSlice"

interface UserAccount {
  attributes: {
    username: string;
    // Add other properties here
  }
  // Add other properties here
}

const GetAllProduct = () => {

  const dispatch = useDispatch();
  const getUserAccounts = useSelector(getUserAccount) as UserAccount[] 

  useEffect(() => {
    if(getUserAccounts){
      getUserAccounts.forEach(user => {
        console.log("getUserAccounts", user.attributes.username);
      });
    }
  }, [getUserAccounts]);

  return (
    <div>GetAllProduct</div>
  )
}

export default GetAllProduct