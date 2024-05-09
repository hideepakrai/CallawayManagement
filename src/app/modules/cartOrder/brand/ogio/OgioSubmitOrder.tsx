import React, { useEffect, useState } from 'react'
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import {getRetailerDetails} from "../../../../slice/orderSlice/travis/Orderdetails"
import { LoadingStart, LoadingStop } from '../../../../slice/loading/LoadingSlice';
import { CreateOrder } from '../../orderApi/OrderAPi';


type Props={
    totalNetBillAmount:number;
    discountType:string;
    discountValue:number;
    resetSubmitOrder:(orderId:number)=>void
}

const OgioSubmitOrder = ({totalNetBillAmount,discountValue,discountType,resetSubmitOrder}:Props) => {
  const getOgioProduct= useSelector(getOgioProducts)
  const [userId, setUserId] = useState<number>();
  const dispatch= useDispatch()

   // update user Id
   const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(() => {
    if (getCurrentUsers) {

     
      setUserId(getCurrentUsers?.user?.id)
    }
  }, [getCurrentUsers])
  
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
      console.log("Ogio order",getOgioProduct)

       setGetAllOgioOrders(ogio)
    }
  },[getOgioProduct]);


  //getAlll retailer detail 
  const getRetailerDetail= useSelector(getRetailerDetails)
  useEffect(()=>{
if(getRetailerDetail && 
    getRetailerDetail.retailerUserId &&
    getRetailerDetail.retailerId&&
    userId &&
    totalNetBillAmount&&
    discountValue&&
    discountType 
){
        handleCreateOrder()
    }

  },[allOgioOrders,getRetailerDetail,userId,totalNetBillAmount,discountType,discountValue])
    

  const handleCreateOrder = () => {

      dispatch(LoadingStart())
      if (Array.isArray(allOgioOrders)) {
  
        const orderId = generateUniqueNumeric();
        let brand;
        let amount;
        const ProductDetail: ProductDetails[] = [];
        allOgioOrders.forEach((item: OgioBasicModel) => {
          brand = item.SetType;
          amount = totalNetBillAmount;
          ProductDetail.push({
            product: item.id,
            // Qty88: item.Quantity88,
            Qty90: item.Quantity90,
            TotalPrice: item.FinalBillValue,
            UnitPrice: item.MRP
  
          });
        const ogiodata=item.OgiAttributes
        const st90=item.Quantity90
          if(ogiodata && ogiodata[0]?.Stock90  &&st90){
  
          const  stk90=ogiodata[0]?.Stock90- st90
          //updateQty(item?.id, stk88, stk90)
  
          }
          
  
        });
  
  
        const comments = {
          Comment: "submit for review",
          Type: "Event",
          "users_permissions_user (1)": userId
        }
           if(userId &&getRetailerDetail.retailerId &&orderId){
          
             const data:CartModel = {
              OrderId: orderId,
              Status: "Pending",
              ProductDetails: ProductDetail,
              retailer: getRetailerDetail.retailerId,
             

              users: {
                connect: [
                  {
                    id: getRetailerDetail.retailerUserId,
                    position: {
                      end: true
                    }
                  },
                  {
                  id: userId,
                  position: {
                    end: true
                  }
                }, 
               
              ]
              },
              Brand: brand,
              Amount: totalNetBillAmount,
              DiscountType: discountType,
              DiscountPercent: discountValue,
              Comments: [comments]
            }
  
           createOrder(data)
           }
        
        
  
       
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
   
      if (response?.data.id) {
        setOrderId(response?.data.id)
         resetSubmitOrder(response?.data.id)
      }


    }
    catch (err) {
      console.log(err);
      dispatch(LoadingStop())
      alert("Error on creating order")
      
    }
  }


  
  return (
    <div>OgioSubmitOrder</div>
  )
}

export default OgioSubmitOrder

