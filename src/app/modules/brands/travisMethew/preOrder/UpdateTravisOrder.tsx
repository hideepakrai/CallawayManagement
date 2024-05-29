import React, { useState, useEffect } from 'react'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice'
import { useSelector } from 'react-redux'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice'
import { CartModel } from '../../../model/CartOrder/CartModel'
import { UpdateOrder } from '../../../cartOrder/orderApi/OrderAPi'

type Props = {
  resetUpdateOrder: () => void,
  preorderId: number
}
const UpdateTravisOrder = ({ resetUpdateOrder, preorderId }: Props) => {
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelTravis[]>([])
  const [brandId, setBrandId] = useState<number>()
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts);
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(() => {
    const ogio: BasicModelTravis[] = [];
    if (getProduct && getProduct.length > 0 &&preorderId) {
      getProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "" && item.brand_id ) {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,

          })
          setBrandId(item.brand_id)

        }
      })


      setGetAllTravisOrders(ogio)
    }
  }, [getProduct,preorderId]);



  useEffect(() => {
    if (allTravisOrders && allTravisOrders.length > 0) {
      const now = new Date();
      const formattedTimestamp = now.toISOString();
      const update = {
        id: preorderId,
        order_date: formattedTimestamp,
        brand_id: brandId,
        note:"",
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allTravisOrders),
        status: "Pending",
        discount_type:"",
        discount_percent:0,
        total_value:0,
        discount_amount:0,
        total_val_pre_discount:0,
        updated_at: formattedTimestamp,
        manager_id: 0,
        retailer_id: 0,
        salesrep_id: 0,
        retailer_details:""
      }
      updateOrder(update)
    }
  }, [allTravisOrders])

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