import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { from } from '@apollo/client';
import { LoadingStop, LoadingStart } from "../../../slice/loading/LoadingSlice"
import { updateOrderStatus } from "../../../slice/UserSlice/UserSlice"
import GetAllorder from '../../orderPage/GetAllorder';
import { ApproveOrder } from '../../cartOrder/orderApi/OrderAPi';
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;
type Props = {
    orderId: number;
    note:string;
    status: string;
    resetOrder:()=>void
};

const UpdateStatus = ({ orderId, status,note,resetOrder }: Props) => {

    const [isOrder, setIsOrder]= useState<boolean>(false)
    console.log("value status",orderId, status)
    const dispatch = useDispatch()
    useEffect(() => {
        if (orderId && status) {
            updateOrder(status, orderId);
            dispatch(LoadingStart())
        }
    }, [orderId, status]);

    const updateOrder = async (status: string, orderId: number): Promise<void> => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const data = {
            id: orderId,
            status: status,
            updated_at: formattedTimestamp,
           note:note,
          
        }
        try {
            const response =  await ApproveOrder(data);
            if (response) {
                // dispatch(LoadingStop())

                if(response){
                    setIsOrder(true)
                   
                }
            }

            // Assuming response.data contains the updated order details
        } catch (err) {
            console.error('Error updating order:', err);
            resetOrder()
            // Handle error (e.g., display error message to the user)
        }
    };


    const handleResetOrder=()=>{
       
        resetOrder()
    }
    return <div>

{isOrder && <GetAllorder
        resetOrder={handleResetOrder}
        />}
    </div>;
};

export default UpdateStatus;
