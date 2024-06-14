import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../../slice/UserSlice/UserSlice'
import { BasicModelGoods } from '../../../../model/goods/CallawayGoodsModel'
import { addHardGoodsNote, addPreOrderId, getHardGoodsProducts, updateProgressStep } from '../../../../../slice/allProducts/CallAwayGoodsSlice'
import { CurentUser } from '../../../../model/useAccount/CurrentUser'
import { CartModel } from '../../../../model/CartOrder/CartModel'
import { CreateOrder } from '../../../../cartOrder/orderApi/OrderAPi'


type Props = {
  resetCreatedOrder: () => void;
}
const CreatedOrder = ({ resetCreatedOrder }: Props) => {
  const dispatch = useDispatch()
  const getProduct: BasicModelGoods[] = useSelector(getHardGoodsProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
 
  // getAll Order
  const [allhardGoodsOrders, setGetAllhardGoodsOrders] = useState<BasicModelGoods[]>([])
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

        setManagerUserId(getCurrentUsers.manager_id)
        setUserId(getCurrentUsers.id)
      } else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
        setManagerUserId(getCurrentUsers.manager_id);
      }


    }
  }, [getCurrentUsers])

  
  useEffect(() => {
    const hard: BasicModelGoods[] = [];
    if (getProduct && getProduct.length > 0) {
      getProduct.map((item) => {
        if (item.ordered  && item.error88 === "" ) {
          hard.push({
            sku: item.sku,
            mrp: item.mrp,
           // stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
          //  size: item.size,
            color:item.color,
            Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount
            

          })

        }
      })


      setGetAllhardGoodsOrders(hard)
    }
  }, [getProduct]);


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
    // eslint-disable-next-line no-debugger
    //debugger
    if (allhardGoodsOrders && 
      allhardGoodsOrders.length > 0 &&
     
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
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allhardGoodsOrders),
        status: "Pending",
        created_at: formattedTimestamp,
        updated_at: formattedTimestamp,
        manager_id: managerUserId,
        salesrep_id: salesRepId??0,
        brand_id:1,

      }
      dispatch(addHardGoodsNote({
        note:data1
      }))
      createOrder(data)
    }
  }, [allhardGoodsOrders,salesRepId,managerUserId])


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

export default CreatedOrder