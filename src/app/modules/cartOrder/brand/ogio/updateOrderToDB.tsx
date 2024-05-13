import React, { useEffect, useState } from 'react'
import { UseDispatch, useSelector } from 'react-redux'
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
  

type props={
    resetUpdateOrder:()=>void
}


const UpdateOrderToDB = ({resetUpdateOrder}:props) => {


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
                
                updateStock(updatestock)
                }
        
        
    },[updatestock])


    const updateStock= async (allData:OgioBasicModel[]) => {
        try {

            const response = await UpdateStockQuantity(allData)


            console.log("updated quantity",response)
            if(response.message==="Products stock quantity updated successfully"){
                resetUpdateOrder()
            }else{
                alert("Error updating stock quantity");
                resetUpdateOrder()
            }
        } catch (error) {
            console.log(error)
            resetUpdateOrder()
        }
    }

  return (
    <div>UpdateOrderToDB</div>
  )
}

export default UpdateOrderToDB