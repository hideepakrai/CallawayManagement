import React , {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getApparelProducts, getPreOrderId } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel'
import CreatedSoftGoodOrder from './CreateSoftGoodOrder'
import UpdateSoftGoodOrder from './UpdateSoftGoodOrder'

const PreOrderHome = () => {
    
    const dispatch= useDispatch()
 console.log("preorder")
    const getApparelProduct = useSelector(getApparelProducts)
    const [allPreOrderSoftGoood, setAllPreOrderSoftGoood]= useState<BasicModelApparel[]>([])
    const getPreOrderIds= useSelector(getPreOrderId)
      const [isCreateOrder, setIscreateOrder]= useState<boolean>(false)
      const [isUpdateOrder, setIsUpdateOrder]= useState<boolean>(false)
    // get All orders
    useEffect(()=>{
        const allpre:BasicModelApparel[]=[];
       
        if(getApparelProduct && getApparelProduct.length>0){
            getApparelProduct.map(item=>{
                if(item.ordered && item.error88==="" && item.error90===""){
                    allpre.push(item)
                }
            })
        }
        setAllPreOrderSoftGoood(allpre)
    },[getApparelProduct])
  const [preorderId, setPreOderId]= useState<number|null>(null)
// check the PreOrderId and create else update order
useEffect(()=>{

     
    if(getPreOrderIds===0 &&
         allPreOrderSoftGoood && 
         allPreOrderSoftGoood.length>0){
    setIscreateOrder(true)

    }else if(getPreOrderIds!=0){
        setPreOderId(getPreOrderIds)
    }
},[getPreOrderIds,allPreOrderSoftGoood])

 

const handleResetCreatedOrder=()=>{
 setIscreateOrder(false)
 
}

const handleResetUpdateOrder=()=>{
 //setIsUpdateOrder(false)
 
}
  return (
    <div>

       { isCreateOrder &&<CreatedSoftGoodOrder
        resetCreatedOrder={handleResetCreatedOrder}
        />}

        {preorderId !=null && 
        <UpdateSoftGoodOrder
        preorderId={preorderId}
        resetUpdateOrder={handleResetUpdateOrder}
        />}
    </div>
  )
}

export default PreOrderHome