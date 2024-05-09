import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOgioProducts, updateQunatityAfterOrder } from '../../../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';


type Props = {
  resetUpdateRedux: () => void;
}

const UpdateRedux = ({resetUpdateRedux}:Props) => {

  const dispatch = useDispatch()
    const getOgioProduct= useSelector(getOgioProducts)
    const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
 
  
    useEffect(()=>{
      const ogio:OgioBasicModel[]=[];
      if(getOgioProduct &&getOgioProduct.length>0){
        getOgioProduct.map((item,index)=>{
          if(item.ordered && item.error===""){
           
            // update in redux
            dispatch(updateQunatityAfterOrder({
              ogioProduct:item})) // update in redux
              console.log("updateQunatityAfterOrder in redux")
          }
        })
        console.log("Ogio order",getOgioProduct)
  
        

         resetUpdateRedux()
      }
    },[getOgioProduct]);
  return (
    <div></div>
  )
}

export default UpdateRedux