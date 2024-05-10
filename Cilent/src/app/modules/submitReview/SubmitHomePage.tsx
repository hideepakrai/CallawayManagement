import React, { useEffect, useState } from 'react'

import OgioProduct from "../../api/allProduct/ogio/OgioProduct";
import { boolean } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getOgioOrder, resetOgioOrder, updateError } from '../../slice/orderSlice/ogio/OgioCartOrderSlice';
import { getOgioProducts, resetOgio } from '../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../model/ogio/OgioBrandModel';


type Props = {
  startReviewBrand:string|null
  closeCompare:(noOfOrder:number)=>void
}
const SubmitHomePage = ({startReviewBrand,closeCompare}:Props) => {

  const dispatch= useDispatch()
  const getOgioOrders=useSelector(getOgioOrder);
    const [isOgio, setIsOgio]= useState<boolean>(false)
    const [ ogio, setOgio]= useState<OgioBasicModel[]>([])
   const getOgioProduct= useSelector(getOgioProducts)
  useEffect(()=>{

    if(startReviewBrand=== "Ogio"){
      dispatch(resetOgio())
      console.log("Ogio")
      setIsOgio(true)
    }
  },[startReviewBrand])

  // close query
  const handleCloseOgioQuery=()=>{
    setIsOgio(false)
    console.log("Close Ogio")
    compareOrderQty()
  }

  useEffect(()=>{
    if(getOgioProduct){
      //console.log("Ogio order",getOgioOrders)
      setOgio(getOgioProduct)

    }
  },[getOgioProduct]);


  const compareOrderQty=()=>{
    let noOfOrder=0;
    getOgioOrders.map((order)=>{
       ogio.map((product)=>{
        if(order.SKU===product.SKU){
          if(product && product.OgiAttributes  && product.OgiAttributes[0]){
            const stk90=product.OgiAttributes[0].Stock90?product.OgiAttributes[0].Stock90:0
            const ordr= order.Quantity90?order.Quantity90:0
             if(ordr >stk90){
              noOfOrder=noOfOrder+1;
              console.log("noOfOrder",noOfOrder+1)
                dispatch(updateError({
                  orderdata:order,
                  stock90:stk90
                }))
             }
          } 
        }
       })
    })
  
    closeCompare(noOfOrder)
  }

  return (
    <div>

     { isOgio &&<OgioProduct
     resetOgio={handleCloseOgioQuery}
     />}
    </div>
  )
}

export default SubmitHomePage