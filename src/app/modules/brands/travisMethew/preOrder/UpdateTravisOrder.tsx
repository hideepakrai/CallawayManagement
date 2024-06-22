import React, { useState, useEffect } from 'react'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { addTravisNote, getTravisNote, getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice'
import { useSelector } from 'react-redux'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { CartModel } from '../../../model/CartOrder/CartModel'
import { UpdateOrder } from '../../../cartOrder/orderApi/OrderAPi'
import {useDispatch} from "react-redux"
type Props = {
  resetUpdateOrder: () => void,
  preorderId: number
}
const UpdateTravisOrder = ({ resetUpdateOrder, preorderId }: Props) => {
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelTravis[]>([])
  const [brandId, setBrandId] = useState<number>()
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts);
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  const dispatch= useDispatch()
  useEffect(() => {
    const ogio: BasicModelTravis[] = [];
    if (getProduct && getProduct.length > 0 &&preorderId) {
      getProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "") {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
            size: item.size,
            color:item.color,
            //Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount,
            description:item.description,
            Amount:item.FinalBillValue,



          })
       
        }
      })


      setGetAllTravisOrders(ogio)
    }
  }, [getProduct,preorderId]);


  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
 
  useEffect(() => {
        


    if (getCurrentUsers &&
      getCurrentUsers.role &&
      getCurrentUsers.id
    ) {

      if (getCurrentUsers.role === "Manager") {
        settypeOfAccount(getCurrentUsers.role)
        setManagerUserId(getCurrentUsers.id)
        setUserId(getCurrentUsers.id)
      } else if (getCurrentUsers.role === "Sales Representative" && getCurrentUsers.manager_id) {
        settypeOfAccount(getCurrentUsers.role)
        setSalesRepId(getCurrentUsers.id)
        setManagerUserId(getCurrentUsers.manager_id)
        setUserId(getCurrentUsers.id)
      }else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
        setManagerUserId(getCurrentUsers.manager_id);
      }else if (getCurrentUsers.role === "Admin" && getCurrentUsers.manager_id !=undefined) {
        settypeOfAccount(getCurrentUsers.role)
         setSalesRepId(0)
         setManagerUserId(getCurrentUsers.manager_id)
        // setUserId(getCurrentUsers.id)
       }

    }
  }, [getCurrentUsers])
  const getAllUsers=useSelector(getUserProfile)
  const [salesRepId, setSalesRepId]= useState<number>(0)
 useEffect(()=>{
  if(getAllUsers &&getAllUsers){
    getAllUsers.map(item=>{
      if( item.id &&item.role==="Sales Representative"){

        setSalesRepId(item.id)
      }
    })
  }
 },[getAllUsers])


const getTravisNotes= useSelector(getTravisNote)
 const [totalAmount, setTotalAmount] = useState<number>()
 const [discountAmount, setDiscountAmount] = useState<number>()
 const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
//  const [messageApi, contextHolder] = antdMessage.useMessage();
 useEffect(() => {
   let tAmount: number = 0;
   let totalBillAmount: number = 0;
   if (getProduct && getProduct.length > 0) {
     getProduct.map((item: BasicModelTravis) => {
       if (item.Amount && item.ordered && item.error88===""  && item.error90==="") {
         tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
       }
       if (item.FinalBillValue && item.ordered &&item.error88==="" && item.error90==="") {

         totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
       }

     })
     setTotalAmount(tAmount)
     setTotalNetBillAmount(totalBillAmount)
     setDiscountAmount(tAmount - totalBillAmount)
   }
 }, [getProduct])
  useEffect(() => {
        
    if (allTravisOrders && 
      allTravisOrders.length > 0 &&
      salesRepId!=undefined &&
      managerUserId!=undefined
      &&
      getCurrentUsers &&
      totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getTravisNotes
    ) {
      
      const now = new Date();
      const formattedTimestamp = now.toISOString();

      const update = {
        id: preorderId,
        order_date: formattedTimestamp,
        brand_id: 3,
        note:JSON.stringify(getTravisNotes),
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allTravisOrders),
        status: "Pending",
        discount_type:"Inclusive",
        discount_percent:22,
        total_value:totalNetBillAmount,
        discount_amount:discountAmount,
        total_val_pre_discount:totalAmount,
        updated_at: formattedTimestamp,
        manager_id: managerUserId,
        retailer_id: 0,
        salesrep_id: salesRepId,
        retailer_details:""
      }
      updateOrder(update)
    }
  }, [allTravisOrders,salesRepId,managerUserId,getCurrentUsers,totalAmount,discountAmount,totalNetBillAmount])

  const updateOrder = async (data: CartModel) => {
    try {
      const response = await UpdateOrder(data);
      if (response) {
        resetUpdateOrder()
      }


    }
    catch (err) {
      //dispatch(LoadingStop())
      // alert("Error on creating order")
      resetUpdateOrder()

    }
  }
  return (
    <div></div>
  )
}

export default UpdateTravisOrder