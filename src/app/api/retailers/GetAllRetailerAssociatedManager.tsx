import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { GetAlllRetailerAssManager } from './api/GetAllREtailer';
import { addRetailer, getRetailers } from '../../slice/retailer/RetailerSlice';
 

type Props = {
    resetRetailer:()=>void
}



const GetAllRetailerAssociatedManager = ({resetRetailer}:Props) => {
  const dispatch= useDispatch();
  const getRetailer= useSelector(getRetailers)

    useEffect(()=>{
        if(getRetailer && getRetailer.length===0){
            getAllRetailersAssociatedManager()
        }
    

    },[getRetailers])


    const getAllRetailersAssociatedManager= async()=>{
        try{

            const response = await GetAlllRetailerAssManager();
             
            if(response){
                dispatch(addRetailer({
                    retailer:response
                }))
            }
             resetRetailer()
        } catch(error){
            resetRetailer()
        }

    }
  return (
    <div></div>
  )
}

export default GetAllRetailerAssociatedManager;