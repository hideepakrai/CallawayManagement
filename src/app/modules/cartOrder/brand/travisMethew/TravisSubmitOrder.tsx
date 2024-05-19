import React, { useEffect, useState } from 'react'
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../model/travis/TravisMethewModel"
import {getTravisProducts,getOtherProducts} from "../../../../slice/allProducts/TravisMethewSlice"
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

const TravisSubmitOrder = ({totalNetBillAmount,discountValue,discountType,resetSubmitOrder}:Props) => {
    const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
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
  const [ allTravisOrders, setGetAllTravisOrders]= useState<BasicModelTravis[]>([])
 const [brandId, setBrandId]= useState<number>()
    
  useEffect(()=>{
    const ogio:BasicModelTravis[]=[];
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
    getRetailerDetail.retailerUserId &&
    getRetailerDetail.retailerId&&
   
    totalNetBillAmount&&
    discountValue&&
    discountType  &&
    managerUserId
){
        handleCreateOrder()
    }

  },[allTravisOrders,getRetailerDetail,totalNetBillAmount,discountType,discountValue,managerUserId])
    

  const handleCreateOrder = () => {
    
      dispatch(LoadingStart());
      const orderId = generateUniqueNumeric();
      const now = new Date();
      if (Array.isArray(allTravisOrders) &&orderId) {
        const data={
          order_date:"",
          brand_id:brandId,
          user_id:managerUserId?managerUserId:0,
          items:JSON.stringify(allTravisOrders),
          discount_type:discountType,
          discount_percent:discountValue,
          total_value:totalNetBillAmount,
          status:"Pending",
          manager_id:managerUserId,
          retailer_id:getRetailerDetail.retailerUserId,
          salesrep_id:111,
        

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
    setGetAllTravisOrders([])
    resetSubmitOrder()
  }
   
  
  return (
    <div>

{isOrder && userId &&
    <GetAllorder
    userId={userId}
    
    resetOrder={handleResetOrder}
    />} 


    </div>
  )
}

export default TravisSubmitOrder

