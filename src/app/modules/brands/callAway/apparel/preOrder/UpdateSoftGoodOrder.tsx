import React, { useState, useEffect } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { CurentUser } from '../../../../model/useAccount/CurrentUser'
import { CartModel } from '../../../../model/CartOrder/CartModel'
import { getApparelNote, getApparelProducts } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { UpdateOrder } from '../../../../cartOrder/orderApi/OrderAPi'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel'
import { getCurrentUser, getUserProfile } from '../../../../../slice/UserSlice/UserSlice'

type Props = {
  resetUpdateOrder: () => void,
  preorderId: number
}
const UpdateSoftGoodOrder = ({ resetUpdateOrder, preorderId }: Props) => {
    const [allPreOrderSoftGoood, setAllPreOrderSoftGoood]= useState<BasicModelApparel[]>([])
  const [brandId, setBrandId] = useState<number>()
  const getApparelProduct = useSelector(getApparelProducts)
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  const dispatch= useDispatch()
  useEffect(() => {
    const apparel: BasicModelApparel[] = [];
    if (getApparelProduct && getApparelProduct.length > 0 &&preorderId) {
      getApparelProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "" ) {
            apparel.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
            size: item.size,
            color:item.color,
            Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount

          })
         

        }
        if(apparel.length>0){
            setAllPreOrderSoftGoood(apparel)
        }
      })


     
    }
  }, [getApparelProduct,preorderId]);


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


const getApparelNotes= useSelector(getApparelNote)
 const [totalAmount, setTotalAmount] = useState<number>()
 const [discountAmount, setDiscountAmount] = useState<number>()
 const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
//  const [messageApi, contextHolder] = antdMessage.useMessage();
 useEffect(() => {
   let tAmount: number = 0;
   let totalBillAmount: number = 0;
   if (getApparelProduct && getApparelProduct.length > 0) {
     getApparelProduct.map((item: BasicModelApparel) => {
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
 }, [getApparelProduct])
  useEffect(() => {
   
    if (allPreOrderSoftGoood && 
      allPreOrderSoftGoood.length > 0 &&
      salesRepId &&
      managerUserId &&
      getCurrentUsers &&
      totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getApparelNotes
    ) {
      
      const now = new Date();
      const formattedTimestamp = now.toISOString();

      const update = {
        id: preorderId,
        order_date: formattedTimestamp,
        brand_id: brandId,
        note:JSON.stringify(getApparelNotes),
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allPreOrderSoftGoood),
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
  }, [allPreOrderSoftGoood,salesRepId,managerUserId,getCurrentUsers,totalAmount,discountAmount,totalNetBillAmount])

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

export default UpdateSoftGoodOrder