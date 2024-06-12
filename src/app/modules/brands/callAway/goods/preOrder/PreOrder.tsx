import React , {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPreOrderId, getHardGoodsProducts } from '../../../../../slice/allProducts/CallAwayGoodsSlice'
import { BasicModelGoods } from '../../../../model/goods/CallawayGoodsModel'
import CreatedOrder from './CreatedOrder'
import UpdateOrder from "./UpdateHardGoodsOrder"
import UpdateTravisOrder from './UpdateHardGoodsOrder'
const PreOrder = () => {
    
    const dispatch= useDispatch()

    const getHardGoodsProduct = useSelector(getHardGoodsProducts)
    const [allPreOrderHardGoods, setAllPreOrderHardGoods]= useState<BasicModelGoods[]>([])
    const getPreOrderIds= useSelector(getPreOrderId)
      const [isCreateOrder, setIscreateOrder]= useState<boolean>(false)
      const [isUpdateOrder, setIsUpdateOrder]= useState<boolean>(false)
    // get All orders
    useEffect(()=>{

        const allpre:BasicModelGoods[]=[]
        if(getHardGoodsProduct && getHardGoodsProduct.length>0){
            getHardGoodsProduct.map(item=>{
                if(item.ordered && item.error90===""){
                    allpre.push(item)
                }
            })
        }
        setAllPreOrderHardGoods(allpre)
    },[getHardGoodsProduct])
  const [preorderId, setPreOderId]= useState<number|null>(null)
// check the PreOrderId and create else update order
useEffect(()=>{

   
    if(getPreOrderIds===0 &&
         allPreOrderHardGoods && 
         allPreOrderHardGoods.length>0){
    setIscreateOrder(true)

    }else if(getPreOrderIds!=0){
        setPreOderId(getPreOrderIds)
    }
},[getPreOrderIds,allPreOrderHardGoods])

 

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