import React, { useState, useEffect } from 'react'
import { BasicModelGoods } from '../../../../model/goods/CallawayGoodsModel'
import { addHardGoodsNote, getHardGoodsNote, getHardGoodsProducts } from '../../../../../slice/allProducts/CallAwayGoodsSlice'
import { useSelector } from 'react-redux'
import { CurentUser } from '../../../../model/useAccount/CurrentUser'
import { getCurrentUser, getUserProfile } from '../../../../../slice/UserSlice/UserSlice'
import { CartModel } from '../../../../model/CartOrder/CartModel'
import { UpdateOrder } from '../../../../cartOrder/orderApi/OrderAPi'

import {useDispatch} from "react-redux"
type Props = {
  resetUpdateOrder: () => void,
  preorderId: number
}
const UpdateHardGoodsOrder = ({ resetUpdateOrder, preorderId }: Props) => {
  const [allHardGoodsOrders, setGetAllHardGoodsOrders] = useState<BasicModelGoods[]>([])
  const [brandId, setBrandId] = useState<number>()
  const getProduct: BasicModelGoods[] = useSelector(getHardGoodsProducts);
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  const dispatch= useDispatch()
  useEffect(() => {
    const ogio: BasicModelGoods[] = [];
    if (getProduct && getProduct.length > 0 &&preorderId) {
      getProduct.map((item) => {
        if (item.ordered && item.error88 === ""  ) {

          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
            //size: item.size,
            color:item.color,
           // Amount:item.Amount,
           Amount:item.FinalBillValue,
            LessDiscountAmount:item.LessDiscountAmount,
            description:item.description,
            Discount:item.Discount,

          })

        }
      })


      setGetAllHardGoodsOrders(ogio)
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


const getHardGoodsNotes= useSelector(getHardGoodsNote)
 const [totalAmount, setTotalAmount] = useState<number>()
 const [discountAmount, setDiscountAmount] = useState<number>()
 const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
//  const [messageApi, contextHolder] = antdMessage.useMessage();
 useEffect(() => {
   let tAmount: number = 0;
   let totalBillAmount: number = 0;
   if (getProduct && getProduct.length > 0) {
     getProduct.map((item: BasicModelGoods) => {
       if (item.Amount && item.ordered) {
         tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
       }
       if (item.FinalBillValue && item.ordered) {

         totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
       }

     })
     setTotalAmount(tAmount)
     setTotalNetBillAmount(totalBillAmount)
     setDiscountAmount(tAmount - totalBillAmount)
   }
 }, [getProduct])
  useEffect(() => {
    if (allHardGoodsOrders && 
        allHardGoodsOrders.length > 0 &&
      salesRepId &&
      managerUserId &&
      getCurrentUsers &&
      totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getHardGoodsNotes
    ) {
      
      const now = new Date();
      const formattedTimestamp = now.toISOString();

      const update = {
        id: preorderId,
        order_date: formattedTimestamp,
        brand_id: 1,
        note:JSON.stringify(getHardGoodsNotes),
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allHardGoodsOrders),
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
  }, [allHardGoodsOrders,salesRepId,managerUserId,getCurrentUsers,totalAmount,discountAmount,totalNetBillAmount])

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

export default UpdateHardGoodsOrder