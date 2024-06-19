import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../../slice/UserSlice/UserSlice';
import { addSoftGoodNote, addPreOrderId, getApparelProducts, updateProgressStep } from '../../../../../slice/allProducts/CallawayApparelSlice';
import { CurentUser } from '../../../../model/useAccount/CurrentUser';
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import { CartModel } from '../../../../model/CartOrder/CartModel';
import { CreateOrder } from '../../../../cartOrder/orderApi/OrderAPi';


type Props = {
  resetCreatedOrder: () => void;
}
const CreatedSoftGoodOrder = ({ resetCreatedOrder }: Props) => {
  const dispatch = useDispatch()
  const getApparelProduct = useSelector(getApparelProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
 
  // getAll Order
  const [allPreOrderSoftGoood, setAllPreOrderSoftGoood]= useState<BasicModelApparel[]>([])
  const [brandId, setBrandId] = useState<number>()


  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
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
      } else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
        setManagerUserId(getCurrentUsers.manager_id);
      }


    }
  }, [getCurrentUsers])

  
  useEffect(() => {
    const apparel: BasicModelApparel[] = [];
    if (getApparelProduct && getApparelProduct.length > 0) {
      getApparelProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "") {
            apparel.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
            size: item.size,
            color:item.color,
           // Amount:item.Amount,
           Amount:item.FinalBillValue,
            LessDiscountAmount:item.LessDiscountAmount,
            description:item.description,

            

          })
          //setBrandId(item.brand_id)

        }
      })


      setAllPreOrderSoftGoood(apparel)
    }
  }, [getApparelProduct]);


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
  /// after getting product create order

  useEffect(() => {
   
    if (allPreOrderSoftGoood && 
      allPreOrderSoftGoood.length > 0 &&
     
      managerUserId
    ) {
      const now = new Date();
      const formattedTimestamp = now.toISOString();
      const data1={
        message: "Order Initiated ",
        name: getCurrentUsers?.name,
        date: formattedTimestamp,
        user_id:getCurrentUsers?.id,
        access:"all",
        type:"system"
}

      const data = {
        note: JSON.stringify(data1),
        order_date: formattedTimestamp,
        brand_id: 2,
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allPreOrderSoftGoood),
        status: "Pending",
        created_at: formattedTimestamp,
        updated_at: formattedTimestamp,
        manager_id: managerUserId,
        salesrep_id: salesRepId??0,

      }
      dispatch(addSoftGoodNote({
        note:data1
      }))
      createOrder(data)
    }
  }, [allPreOrderSoftGoood,salesRepId,managerUserId])


  const createOrder = async (data: CartModel) => {
    try {
      const response = await CreateOrder(data);
      if (response.status === 200) {

        const orderId = response?.data?.insertId
        dispatch(addPreOrderId({
          preOrderId: orderId,
        }))
        dispatch(updateProgressStep({
          progressStep: 0

        }))
      }
      resetCreatedOrder()

    }
    catch (err) {
      //dispatch(LoadingStop())
      // alert("Error on creating order")
      resetCreatedOrder()

    }
  }
 


  return (
    <div>

    </div>
  )
}

export default CreatedSoftGoodOrder