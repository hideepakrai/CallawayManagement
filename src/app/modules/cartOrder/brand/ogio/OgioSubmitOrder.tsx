import React, { useEffect, useState } from 'react'
import { getOgioNotes, getOgioProducts, getOgioRetailerDetail, getPreOrderId, updateQunatityAfterOrder } from '../../../../slice/allProducts/OgioSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import { getRetailerDetails } from "../../../../slice/orderSlice/travis/Orderdetails"
import { LoadingStart, LoadingStop } from '../../../../slice/loading/LoadingSlice';
import { CreateOrder, UpdateOrder } from '../../orderApi/OrderAPi';

import GetAllorder from '../../../orderPage/GetAllorder';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';

type Props = {
  totalNetBillAmount: number;
  discountType: string;
  discountValue: number;
  resetSubmitOrder: () => void
  notes: string,
  totalAmount:number,
  discountAmount:number
}

const OgioSubmitOrder = ({ totalNetBillAmount, discountValue, discountType, resetSubmitOrder,totalAmount,discountAmount,notes }: Props) => {
  const getOgioProduct = useSelector(getOgioProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
  const dispatch = useDispatch()
  const getPreOrderIds = useSelector(getPreOrderId)
  
  
  // get Sales Rep id 
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
  // update user Id
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(() => {

    if (getCurrentUsers &&
      getCurrentUsers.role &&
      getCurrentUsers.id) {
        if (getCurrentUsers.role === "Manager") {
          settypeOfAccount(getCurrentUsers.role)
          setManagerUserId(getCurrentUsers.id)
          setUserId(getCurrentUsers.id)
        } else if (getCurrentUsers.role === "Sales Representative" && getCurrentUsers.manager_id) {
          settypeOfAccount(getCurrentUsers.role)
  
          setManagerUserId(getCurrentUsers.manager_id)
          setUserId(getCurrentUsers.id)
        }
        else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
          setManagerUserId(getCurrentUsers.manager_id);
        }

    }
  }, [getCurrentUsers])

  // getAll Order
  const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
  const getOgioNote =useSelector(getOgioNotes)

  useEffect(() => {

    const ogio: OgioBasicModel[] = [];
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item:OgioBasicModel) => {
        if (item.ordered && item.error === "" &&item.Quantity90 ) {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90

          })
         
          console.log("item",item)
        }
      })


      setGetAllOgioOrders(ogio)
    }
  }, [getOgioProduct]);


  //getAlll retailer detail 
  const getRetailerDetail = useSelector(getRetailerDetails)
  const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;
  useEffect(() => {

   
    if (getOgioRetailerDetails &&
      totalAmount&&
      totalNetBillAmount &&
      discountValue &&
      discountType &&
      getPreOrderIds &&
      allOgioOrders &&
      allOgioOrders.length > 0  &&
      salesRepId &&
      getOgioNote
    ) {
      handleCreateOrder()
    }

  }, [allOgioOrders, getOgioNote,getOgioRetailerDetails, totalNetBillAmount, discountType, discountValue, managerUserId])


  const handleCreateOrder = () => {

    dispatch(LoadingStart());
    // const orderId = generateUniqueNumeric();
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const   retailer_details={
      name:getOgioRetailerDetails.name,
      gstin:getOgioRetailerDetails.gstin,
      email:getOgioRetailerDetails.email,
      address:getOgioRetailerDetails.address,
      phone:getOgioRetailerDetails.phone
      }
    if (Array.isArray(allOgioOrders)) {
      const data = {
        id: getPreOrderIds,
        order_date: formattedTimestamp,
        brand_id: 4,
        note:JSON.stringify(getOgioNote),
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allOgioOrders),
        discount_type: discountType,
        discount_percent: discountValue,
        total_value: totalNetBillAmount,
        discount_amount: discountAmount,
        total_val_pre_discount:totalAmount,
        status: "submitted",
        manager_id: managerUserId,
        retailer_id: getOgioRetailerDetails.id,
        salesrep_id: salesRepId,
        retailer_details:JSON.stringify(retailer_details),
        updated_at: formattedTimestamp
      


      }

      createOrder(data)
    }
  }





  const createOrder = async (data: CartModel) => {
    try {
      const response = await UpdateOrder(data);

      resetSubmitOrder()
      if (response) {
        //setReloadUserAccount(true)
        setIsOrder(true)
      }
    }
    catch (err) {
      dispatch(LoadingStop())
      alert("Error on creating order")
      resetSubmitOrder()

    }
  }


  // reset order Id
  const handleResetOrder = () => {
    setIsOrder(false);
    setManagerUserId(null);
    settypeOfAccount("")
    setGetAllOgioOrders([])
    resetSubmitOrder()
  }


  return (
    <div>

      {isOrder &&
        <GetAllorder


          resetOrder={handleResetOrder}
        />}
    </div>
  )
}

export default OgioSubmitOrder

