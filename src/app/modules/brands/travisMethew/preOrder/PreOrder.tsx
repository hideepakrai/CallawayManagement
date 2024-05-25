import React , {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPreOrderId, getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'

const PreOrder = () => {
    
    const dispatch= useDispatch()

    const getTravisProduct = useSelector(getTravisProducts)
    const [allPreOrderTravis, setAllPreOrderTravis]= useState<BasicModelTravis[]>([])
    const getPreOrderIds= useSelector(getPreOrderId)
    
    // get All orders
    useEffect(()=>{
        const allpre:BasicModelTravis[]=[]
        if(getTravisProduct && getTravisProduct.length>0){
            getTravisProduct.map(item=>{
                if(item.ordered && item.error88!="" && item.error90!=""){
                    allpre.push(item)
                }
            })
        }
        setAllPreOrderTravis(allpre)
    },[getTravisProduct])

// check the PreOrderId and create else update order
useEffect(()=>{
    if(getPreOrderIds===0 &&
         allPreOrderTravis && 
         allPreOrderTravis.length>0){
        console.log("getPreOrderIds",getPreOrderIds)
    }
},[getPreOrderIds])

 
  return (
    <div></div>
  )
}

export default PreOrder