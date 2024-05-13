import React, { useEffect } from 'react'
import { GetUserOrder } from './api/_orderRequest'
import { addUserOrders } from '../../slice/UserSlice/UserSlice'
import {useDispatch, useSelector} from "react-redux"


type Props={
    userId:number,
    acountype:string,
    resetOrder:()=>void
}

const GetAllorder = ({userId,acountype,resetOrder}:Props) => {
   const dispatch= useDispatch()


    useEffect(()=>{
      if(acountype && userId){
        GetAllOrders(userId,acountype)
      }

    },[acountype , userId])
    const GetAllOrders=async (userId:number, type:string) => {
        try{
            const response = await GetUserOrder(userId,type)
            
            console.log("all orders", response)
            if(response.length>0){
                dispatch(addUserOrders({
                    userOrders: response.data,
                }))
                resetOrder()
            }else if(response===null){
              alert("No orders")
              resetOrder()
            }

        }catch(err){
            console.log(err)
            resetOrder()
        }

    }
  return (
    <div>GetAllorder</div>
  )
}

export default GetAllorder