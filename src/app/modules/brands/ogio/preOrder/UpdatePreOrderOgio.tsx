import React, { useState, useEffect } from 'react'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import { useSelector } from 'react-redux';
import { getOgioProducts, getPreOrderId } from '../../../../slice/allProducts/OgioSlice';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../../cartOrder/orderApi/OrderAPi';


type Props = {
    resetUpdateOrder: () => void,
    preorderId: number
  }
const UpdatePreOrderOgio = ({ resetUpdateOrder, preorderId }: Props) => {
    const ogioProduct: OgioBasicModel[] = useSelector(getOgioProducts);
    
    const getPreOrderOgioIds= useSelector(getPreOrderId)
    const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
    const [brandId, setBrandId] = useState<number>()
    useEffect(() => {
        const ogio: OgioBasicModel[] = [];
        if (ogioProduct && ogioProduct.length > 0 &&preorderId) {
          ogioProduct.map((item) => {
            if (item.ordered && item.error=== "") {
              ogio.push({
                sku: item.sku,
                mrp: item.mrp,
                stock_90: item.Quantity90 ? item.Quantity90 : 0,
               
    
              })
             
    
            }
          })
    
    
          setGetAllOgioOrders(ogio)
        }
      }, [ogioProduct,preorderId]);


      const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
      useEffect(() => {
        if (allOgioOrders && allOgioOrders.length > 0) {
          const now = new Date();
          const formattedTimestamp = now.toISOString();
          const update = {
            id: getPreOrderOgioIds,
            order_date: formattedTimestamp,
            brand_id: 4,
            user_id: getCurrentUsers.id,
            items: JSON.stringify(allOgioOrders),
            status: "Pending",
    
            updated_at: formattedTimestamp
    
          }
          updateOrder(update)
        }
      }, [allOgioOrders])


      const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetUpdateOrder()
          }
    
    
        }
        catch (err) {
          //dispatch(LoadingStop())
          alert("Error on creating order")
          resetUpdateOrder()
    
        }
      }
  return (
    <div></div>
  )
}

export default UpdatePreOrderOgio