import React ,{useEffect, useState} from 'react'
import { BasicModelTravis } from '../../../../model/travis/TravisMethewModel';
import { UpDateTravisQty } from '../../api/UpdateProductData';

import {useDispatch} from "react-redux"
import { updateTravisQty } from '../../../../../slice/allProducts/TravisMethewSlice';

type Props={
    allQtyXlxData:BasicModelTravis[];
    resetQtyData:(allresponse:string)=>void
}
const TravisUpdateQtyDb = ({allQtyXlxData,resetQtyData}:Props) => {
  
const dispatch=useDispatch()
    useEffect(()=>{
        if(allQtyXlxData &&
            allQtyXlxData.length>0){
            updateQty(allQtyXlxData)}
        
    },[allQtyXlxData])

    const updateQty= (allQtyXlxData:BasicModelTravis[])=>{
   const allQtData:BasicModelTravis[]=[]
        if(allQtyXlxData && allQtyXlxData.length>0){
            allQtyXlxData.map(item=>{
                
                const updateQuantity={
                    sku:item.sku,
                    stock_88:item.stock_88,
                    stock_90:item.stock_90
                }
                allQtData.push(updateQuantity)
            })
        }
        updateQtyApi(allQtData)
    }

    const updateQtyApi=async(data:BasicModelTravis[])=>{


        try{


            const response= await UpDateTravisQty(data);
            console.log("update qty",response);
            if(response.status==200 && response.data){
                dispatch(updateTravisQty({
                    allQtyTravis: data
                }))
                resetQtyData(response.data.message)
            }
            
        }catch(e){
            console.log(e);
            alert("Error updating travis stock quantity");
            resetQtyData("")
        }
    }
  
  
  return (

    <div></div>
  )
}

export default TravisUpdateQtyDb