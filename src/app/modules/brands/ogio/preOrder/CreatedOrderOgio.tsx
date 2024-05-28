import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount } from '../../../../slice/UserSlice/UserSlice'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel'
import { addPreOrderId, getOgioProducts, updateProgressStep } from '../../../../slice/allProducts/OgioSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { CartModel } from '../../../model/CartOrder/CartModel'
import { CreateOrder } from '../../../cartOrder/orderApi/OrderAPi'


type Props = {
    resetCreatedOrder: () => void;
  }
const CreatedOrderOgio = ({ resetCreatedOrder }: Props) => {
  
    const dispatch = useDispatch()
    const ogioProduct: OgioBasicModel[] = useSelector(getOgioProducts);
    const getUserAccounts = useSelector(getUserAccount)
    const [typeOfAccount, settypeOfAccount] = useState<string>("")
    const [managerUserId, setManagerUserId] = useState<number | null>()
    const [userId, setUserId] = useState<number>();
    const [isOrder, setIsOrder] = useState(false);
    const getCurrentUsers = useSelector(getCurrentUser) as CurentUser;


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
          }
    
    
        }
      }, [getCurrentUsers])

        // getAll Order
  const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
  const [brandId, setBrandId] = useState<number>()

  useEffect(() => {
    const ogio: OgioBasicModel[] = [];
    if (ogioProduct && ogioProduct.length > 0) {
      ogioProduct.map((item) => {
        if (item.ordered && item.error==="") {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            
          })
          

        }
      })


      setGetAllOgioOrders(ogio)
    }
  }, [ogioProduct]);


    /// after getting product create order

    useEffect(() => {
        if (allOgioOrders && allOgioOrders.length > 0) {
          const now = new Date();
          const formattedTimestamp = now.toISOString();
          const data = {
            order_date: formattedTimestamp,
            brand_id: 4,
            user_id: getCurrentUsers.id,
            items: JSON.stringify(allOgioOrders),
            status: "Pending",
            created_at: formattedTimestamp,
            updated_at: formattedTimestamp
    
          }
          createOrder(data)
        }
      }, [allOgioOrders])



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
      alert("Error on creating order")
      resetCreatedOrder()

    }
  }
  return (
    <div></div>
  )
}

export default CreatedOrderOgio