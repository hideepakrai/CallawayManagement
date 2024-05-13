import React, { useEffect, useState } from 'react'
import { getOgioProducts, updateQunatityAfterOrder } from '../../../../slice/allProducts/OgioSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser, getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import {getRetailerDetails} from "../../../../slice/orderSlice/travis/Orderdetails"
import { LoadingStart, LoadingStop } from '../../../../slice/loading/LoadingSlice';
import { CreateOrder } from '../../orderApi/OrderAPi';

import GetAllorder from '../../../orderPage/GetAllorder';

type Props={
    totalNetBillAmount:number;
    discountType:string;
    discountValue:number;
    resetSubmitOrder:()=>void
}

const OgioSubmitOrder = ({totalNetBillAmount,discountValue,discountType,resetSubmitOrder}:Props) => {
  const getOgioProduct= useSelector(getOgioProducts)
  const getUserAccounts= useSelector(getUserAccount)
  const [ typeOfAccount, settypeOfAccount]= useState<string>("")
  const [ managerUserId, setManagerUserId]= useState<number|null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder]= useState(false);
  const dispatch= useDispatch()

   // update user Id
   const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
     console.log("getCurrentUsers",getCurrentUsers)
   useEffect(() => {
    
    if (getUserAccounts &&
      getUserAccounts.role &&
      getUserAccounts.user_id) {
 
        if(getUserAccounts.role==="Manager"){
          settypeOfAccount(getUserAccounts.role)
          setManagerUserId(getUserAccounts.user_id)
          setUserId(getUserAccounts.user_id)
        }
        console.log("getUserAccounts,",getUserAccounts)
     
    }
  }, [getUserAccounts])
  
  // getAll Order
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
 
  
  useEffect(()=>{
    const ogio:OgioBasicModel[]=[];
    if(getOgioProduct &&getOgioProduct.length>0){
      getOgioProduct.map((item)=>{
        if(item.ordered && item.error===""){
          ogio.push(item)
          
        }
      })
     

       setGetAllOgioOrders(ogio)
    }
  },[getOgioProduct]);


  //getAlll retailer detail 
  const getRetailerDetail= useSelector(getRetailerDetails)
  useEffect(()=>{
   
    
if(getRetailerDetail && 
    getRetailerDetail.retailerUserId &&
    getRetailerDetail.retailerId&&
   
    totalNetBillAmount&&
    discountValue&&
    discountType  &&
    managerUserId
){
        handleCreateOrder()
    }

  },[allOgioOrders,getRetailerDetail,totalNetBillAmount,discountType,discountValue,managerUserId])
    

  const handleCreateOrder = () => {
      // eslint-disable-next-line no-debugger
      debugger
      dispatch(LoadingStart());
      const orderId = generateUniqueNumeric();
      const now = new Date();
      if (Array.isArray(allOgioOrders) &&orderId) {
        const data={
          order_date:"",
          items:JSON.stringify(allOgioOrders),
          discount_type:discountType,
          discount_percent:discountValue,
          total_value:totalNetBillAmount,
          status:"Pending",
          manager_id:managerUserId,
          retailer_id:getRetailerDetail.retailerUserId,
          salesrep_id:0

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
      const response = await CreateOrder(data);
       console.log("order created ", response)
      if (response==="order created successfully") {
        setReloadUserAccount(true)
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
    resetSubmitOrder()
  }
   
  
  return (
    <div>

{isOrder && userId &&
    <GetAllorder
    userId={userId}
    acountype={typeOfAccount}
    resetOrder={handleResetOrder}
    />}
    </div>
  )
}

export default OgioSubmitOrder

