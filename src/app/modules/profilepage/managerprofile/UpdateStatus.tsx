import React, { useEffect } from 'react';
import axios from 'axios';
import {useDispatch, useSelector}from "react-redux"
    import { from } from '@apollo/client';
import {LoadingStop,LoadingStart} from "../../../slice/loading/LoadingSlice"
import {updateOrderStatus} from "../../../slice/UserSlice/UserSlice"
    const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;

type Props = {
    orderId: number;
    status: string;
};

const UpdateStatus = ({ orderId, status }: Props) => {
   const dispatch= useDispatch()
    useEffect(() => {
        if (orderId && status) {
            updateOrder(status, orderId);
            dispatch(LoadingStart())
        }
    }, [orderId, status]);

    const updateOrder = async (status: string, orderId: number): Promise<void> => {
        const data = {
            data: {
                Status: status,
            },
        };
        try {
            const response = await axios.put(`${STRAPI_URL}/api/orders/${orderId}`, data);
            console.log(response);
            if(response.status===200){
                dispatch(LoadingStop ())

                dispatch(updateOrderStatus({
                    orderId: orderId,
                    status: status,
                }))
                alert("Order updated successfully")
            }
            
             // Assuming response.data contains the updated order details
        } catch (err) {
            console.error('Error updating order:', err);
            // Handle error (e.g., display error message to the user)
        }
    };

    return <div></div>;
};

export default UpdateStatus;
