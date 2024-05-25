import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../model/travis/TravisMethewModel"
import {getTravisProducts,getOtherProducts, updateTravisQty} from "../../../../slice/allProducts/TravisMethewSlice"
import { UpDateTravisQty } from '../../../brands/travisMethew/api/UpdateProductData';

type props={
    resetUpdateData:(updatedate:string)=>void
}


const TravisUpdateOrderToDB = ({resetUpdateData}:props) => {

   const dispatch=useDispatch()
    const getTravisProduct= useSelector(getTravisProducts);
   const [updatestock, setUpdateStock]= useState<BasicModelTravis[]>([])
    useEffect(()=>{
        const newtravis: BasicModelTravis[] = [];
        if(getTravisProduct &&
            getTravisProduct.length>0){
               
                getTravisProduct.map(item=>{
                    if(item.ordered && item.error88 =="" && item.error90===""){
                         
                        if(item.stock_90 && item.Quantity90 &&item.stock_88 &&item.Quantity88){
                            const data={
                                sku:item.sku,
                                stock_90:item.stock_90-item.Quantity90,
                                stock_88:item.stock_88-item.Quantity88
                            }
                            newtravis.push(data)
                        }
                        
                    }
                })
                
            }
            updateQtyApi(newtravis)
            
    },[getTravisProduct])

  


    const updateQtyApi=async(data:BasicModelTravis[])=>{


        try{


            const response= await UpDateTravisQty(data);
            console.log("update qty",response);
            if(response.status==200 && response.data){
                dispatch(updateTravisQty({
                    allQtyTravis: data
                }))
                resetUpdateData(response.data.message)
            }
            
        }catch(e){
            console.log(e);
            alert("Error updating travis stock quantity");
            resetUpdateData("")
        }
    }
 

  return (
    <div></div>
  )
}

export default TravisUpdateOrderToDB