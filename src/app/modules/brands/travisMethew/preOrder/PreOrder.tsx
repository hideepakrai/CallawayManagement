import React , {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPreOrderId, getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import CreatedOrder from './CreatedOrder'
import UpdateOrder from "./UpdateTravisOrder"
import UpdateTravisOrder from './UpdateTravisOrder'
const PreOrder = () => {
    
    const dispatch= useDispatch()

    const getTravisProduct = useSelector(getTravisProducts)
    const [allPreOrderTravis, setAllPreOrderTravis]= useState<BasicModelTravis[]>([])
    const getPreOrderIds= useSelector(getPreOrderId)
      const [isCreateOrder, setIscreateOrder]= useState<boolean>(false)
      const [isUpdateOrder, setIsUpdateOrder]= useState<boolean>(false)
    // get All orders
    useEffect(()=>{
        const allpre:BasicModelTravis[]=[]
        if(getTravisProduct && getTravisProduct.length>0){
            getTravisProduct.map(item=>{
                if(item.ordered && item.error88==="" && item.error90===""){
                    allpre.push(item)
                }
            })
        }
        setAllPreOrderTravis(allpre)
    },[getTravisProduct])
  const [preorderId, setPreOderId]= useState<number|null>(null)
// check the PreOrderId and create else update order
useEffect(()=>{

   
    if(getPreOrderIds===0 &&
         allPreOrderTravis && 
         allPreOrderTravis.length>0){
        console.log("getPreOrderIds",getPreOrderIds)
    setIscreateOrder(true)

    }else if(getPreOrderIds!=0){
        setPreOderId(getPreOrderIds)
    }
},[getPreOrderIds,allPreOrderTravis])

 

const handleResetCreatedOrder=()=>{
 setIscreateOrder(false)
 
}

const handleResetUpdateOrder=()=>{
 //setIsUpdateOrder(false)
 
}
  return (
    <div>

       { isCreateOrder &&<CreatedOrder
        resetCreatedOrder={handleResetCreatedOrder}
        />}

        {preorderId !=null && 
        <UpdateTravisOrder
        preorderId={preorderId}
        resetUpdateOrder={handleResetUpdateOrder}
        />}
    </div>
  )
}

export default PreOrder