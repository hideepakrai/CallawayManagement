import React, { useEffect } from 'react'
import { GetUserOrder } from './api/_orderRequest'
import { addUserOrders, getUserAccount } from '../../slice/UserSlice/UserSlice'
import {useDispatch, useSelector} from "react-redux"
import { GetAllUserOrders } from '../../api/order/OrederApi'


type Props={
    userId:number,
    
    resetOrder:()=>void
}

const GetAllorder = ({userId,resetOrder}:Props) => {
  
   const dispatch= useDispatch()

    useEffect(()=>{
        if(userId){
           
            getAllorders(userId)
            
        }
    },[userId])

    const getAllorders= async (user_id:number) =>{


        try{
            const response= await GetAllUserOrders(user_id)
            if(response){
                dispatch(addUserOrders({
                    userOrders: response
                }))

                resetOrder()
            }

        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>GetAllorder</div>
  )
}

export default GetAllorder