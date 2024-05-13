import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOgioProducts, updateQunatityAfterOrder } from '../../../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';


type props={
    resetReducOgio:()=>void
}

const UpdateReduxOgio=({resetReducOgio}:props)=>{
  const dispatch= useDispatch()
    const getOgioProduct= useSelector(getOgioProducts);
   const [updatestock, setUpdateStock]= useState<OgioBasicModel[]>([])
    useEffect(()=>{
        if(getOgioProduct &&
            getOgioProduct.length>0){
                const newData: OgioBasicModel[] = [];
                getOgioProduct.map(item=>{
                    if(item.ordered && item.error==""){
                         
                        if(item.stock_90 && item.Quantity90){
                            const data={
                                sku:item.sku,
                                stock_90:item.stock_90-item.Quantity90
                            }
                            newData.push(data)
                        }
                        
                    }
                })
                setUpdateStock(newData)
            }
            
    },[getOgioProduct])

    // call API function

    useEffect(() => {
        if(updatestock &&
            updatestock.length>0){
                
              ///  updateReduxStock(updatestock)
                dispatch(updateQunatityAfterOrder({
                    ogioProduct:updatestock
                }))
                }
                resetReducOgio()
        
        
    },[updatestock])


    
  return (
    <div>UpdateReduxOgio</div>
  )
}

export default UpdateReduxOgio