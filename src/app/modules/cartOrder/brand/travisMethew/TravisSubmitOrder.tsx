import React, { useEffect, useState } from 'react'
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../model/travis/TravisMethewModel"
import {getTravisProducts,getOtherProducts, getPreOrderId} from "../../../../slice/allProducts/TravisMethewSlice"
import { useSelector, useDispatch } from 'react-redux'
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser, getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import {getRetailerDetails} from "../../../../slice/orderSlice/travis/Orderdetails"
import { LoadingStart, LoadingStop } from '../../../../slice/loading/LoadingSlice';
import { CreateOrder, UpdateOrder } from '../../orderApi/OrderAPi';

import GetAllorder from '../../../orderPage/GetAllorder';

type Props={
    totalNetBillAmount:number;
    discountType:string;
    discountValue:number;
    resetSubmitOrder:()=>void,
    note:string
}

const TravisSubmitOrder = ({totalNetBillAmount,discountValue,discountType,resetSubmitOrder,note}:Props) => {
    const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
  const getUserAccounts= useSelector(getUserAccount)
  const [ typeOfAccount, settypeOfAccount]= useState<string>("")
  const [ managerUserId, setManagerUserId]= useState<number|null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder]= useState(false);
  const dispatch= useDispatch()
  const getPreOrderIds= useSelector(getPreOrderId)
   // update user Id
   const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
     console.log("getCurrentUsers",getCurrentUsers)
   useEffect(() => {
     // eslint-disable-next-line no-debugger
     debugger
    if (getCurrentUsers &&
      getCurrentUsers.role &&
      getCurrentUsers.id 
      ) {
 
        if(getCurrentUsers.role==="Manager"){
          settypeOfAccount(getCurrentUsers.role)
          setManagerUserId(getCurrentUsers.id)
          setUserId(getCurrentUsers.id)
        }else if(getCurrentUsers.role==="Sales Representative" &&getCurrentUsers.manager_id){
          settypeOfAccount(getCurrentUsers.role)
          
          setManagerUserId(getCurrentUsers.manager_id)
          setUserId(getCurrentUsers.id)
        }
        
     
    }
  }, [getCurrentUsers])
  
  // getAll Order
  const [ allTravisOrders, setGetAllTravisOrders]= useState<BasicModelTravis[]>([])
 const [brandId, setBrandId]= useState<number>()
    
  useEffect(()=>{
    const ogio:BasicModelTravis[]=[];
    // eslint-disable-next-line no-debugger
    debugger
    if(getProduct &&getProduct.length>0){
      getProduct.map((item)=>{
        if(item.ordered && item.error88===""  && item.error90===""&&item.brand_id){
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90?item.Quantity90:0,
            stock_88:item.Quantity88?item.Quantity88:0,
            
          })
          setBrandId(item.brand_id)
          
        }
      })
     

      setGetAllTravisOrders(ogio)
    }
  },[getProduct]);


  //getAlll retailer detail 
  const getRetailerDetail= useSelector(getRetailerDetails)
  useEffect(()=>{
  
    
if(getRetailerDetail && 
  allTravisOrders &&allTravisOrders.length>0 &&
    getRetailerDetail.retailerId&&
   
    totalNetBillAmount&&
    discountValue&&
    discountType &&
    brandId &&
    getPreOrderIds
    
){
        handleCreateOrder()
    }

  },[allTravisOrders,getRetailerDetail,totalNetBillAmount,discountType,discountValue,managerUserId,brandId,getPreOrderIds])
    

  const handleCreateOrder = () => {

    console.log("reached handleCreateOrder")
      dispatch(LoadingStart());
      //const orderId = generateUniqueNumeric();
      const now = new Date();
      const formattedTimestamp = now.toISOString();
      if (Array.isArray(allTravisOrders) &&orderId) {
        const data={
          order_date:formattedTimestamp,
          note:note,
          brand_id:brandId,
          user_id:getCurrentUsers.id,
          items:JSON.stringify(allTravisOrders),
          discount_type:discountType,
          discount_percent:discountValue,
          total_value:totalNetBillAmount,
          status:"submitted",
          manager_id:managerUserId,
          retailer_id:getRetailerDetail.retailerId,
          salesrep_id:111,
          updated_at:formattedTimestamp
        

        }

        createOrder(data)
       }
    }

    function generateUniqueNumeric(): string {
        const timestamp = new Date().getTime().toString().substr(-5); // Get last 5 digits of timestamp
        const randomDigits = Math.floor(Math.random() * 100000); // Generate random 5-digit number
        const paddedRandomDigits = String(randomDigits).padStart(5, '0'); // Pad random number with leading zeros if necessary
        const uniqueId = timestamp + paddedRandomDigits; // Combine timestamp and random number
        return uniqueId;
      }


  const [orderId, setOrderId]= useState<number>(0)
  const [reLoadUserAccount, setReloadUserAccount] = useState(false)
  const createOrder = async (data: CartModel) => {
    try {
      const response = await UpdateOrder(data);
       console.log("order submitted ", response)
      if (response) {
        //setReloadUserAccount(true)
        setIsOrder(true)
      }

    
    }
    catch (err) {
      console.log(err);
      dispatch(LoadingStop())
      alert("Error on creating order")
      resetSubmitOrder()
      
    }
  }

 
  // reset order Id
  const handleResetOrder=() => {
    setIsOrder(false);
    setManagerUserId(null);
    settypeOfAccount("")
    setGetAllTravisOrders([])
    resetSubmitOrder()
  }
   
  
  return (
    <div>

{isOrder &&
    <GetAllorder

    resetOrder={handleResetOrder}
    />} 


    </div>
  )
}

export default TravisSubmitOrder

