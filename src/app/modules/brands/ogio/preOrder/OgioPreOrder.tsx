import React, { useEffect, useState } from 'react'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel'
import { useSelector } from 'react-redux'
import { getOgioProducts, getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import CreatedOrderOgio from './CreatedOrderOgio'
import UpdatePreOrderOgio from './UpdatePreOrderOgio'

const OgioPreOrder = () => {

    const ogioProduct: OgioBasicModel[] = useSelector(getOgioProducts);
    const [allPreOrderOgio, setAllPreOrderOgio]= useState<OgioBasicModel[]>([])
    const getPreOrderOgioIds= useSelector(getPreOrderId)
    useEffect(()=>{
     
      const allogio:OgioBasicModel[]=[]
    if(ogioProduct && ogioProduct.length>0){
        ogioProduct.map((item)=>{
          if(item.sku && item.ordered && item.error===""){
            allogio.push(item)
          }
        })
    }
    if(allogio.length>0){
      setAllPreOrderOgio(allogio)
    }
    },[ogioProduct])

    const [preorderId, setPreOderId]= useState<number|null>(null)
    const [isCreateOrder, setIscreateOrder]= useState<boolean>(false)
// check the PreOrderId and create else update order
useEffect(()=>{

   
  if(getPreOrderOgioIds===0 &&
       allPreOrderOgio && 
       allPreOrderOgio.length>0){
  setIscreateOrder(true)

  }else if(getPreOrderOgioIds!=0){
      setPreOderId(getPreOrderOgioIds)
  }
},[getPreOrderOgioIds,allPreOrderOgio])


const handleResetCreatedOrder=()=>{
  setIscreateOrder(false)
  
 }

 const handleResetUpdateOrder=()=>{
  //setIsUpdateOrder(false)
  
 }

  return (
    <div>

{ isCreateOrder &&<CreatedOrderOgio
        resetCreatedOrder={handleResetCreatedOrder}
        />}


{preorderId !=null && 
        <UpdatePreOrderOgio
        preorderId={preorderId}
        resetUpdateOrder={handleResetUpdateOrder}
        />}
    </div>
  )
}

export default OgioPreOrder