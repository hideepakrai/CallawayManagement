import React, {useEffect, useState} from "react"

import {useDispatch} from "react-redux"
import { LoadingStart } from "../../../slice/loading/LoadingSlice";
import GetAllorder from "../../orderPage/GetAllorder";
import { DeleteOrderDB } from "../../cartOrder/orderApi/OrderAPi";
type Props = {
    orderId: number;
    resetDeleteOrder:()=>void
};
const DeleteOrder=({orderId,resetDeleteOrder}:Props)=>{
     const dispatch= useDispatch()
    const [isOrder, setIsOrder]= useState<boolean>(false)
    useEffect(() => {
        if (orderId ) {
            deleteOrder( orderId);
            dispatch(LoadingStart())
        }
    }, [orderId, status])


    const deleteOrder=async(orderId:number)=>{


        try {
            const response = await DeleteOrderDB(orderId);
            console.log("delete", response)
            if (response) {
                // dispatch(LoadingStop())

                if(response){
                    setIsOrder(true)
                   
                }
            }

            // Assuming response.data contains the updated order details
        } catch (err) {
            console.error('Error updating order:', err);
            resetDeleteOrder()
            // Handle error (e.g., display error message to the user)
        }
    }

    const handleResetOrder=()=>{
       
        resetDeleteOrder()
    }

    return (
        <>
        {isOrder && <GetAllorder
        resetOrder={handleResetOrder}
        />}
        </>
    )
}

export default DeleteOrder;