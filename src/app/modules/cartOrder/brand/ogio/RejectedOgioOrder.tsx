import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOgioNotes, getOgioProducts, getOgioRetailerDetail, getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel'
import { getTravisNote } from '../../../../slice/allProducts/TravisMethewSlice'
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel'

type Props = {
    resetReject: () => void
  }
const RejectedOgioOrder = ({ resetReject }: Props) => {

  const dispatch= useDispatch()
  const getPreOrderIds = useSelector(getPreOrderId)

  const getOgioProduct = useSelector(getOgioProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
 
 
  
  
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
  const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;
  useEffect(() => {

    const ogio: OgioBasicModel[] = [];
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item:OgioBasicModel) => {
        if (item.ordered && item.error === "" &&item.Quantity90 ) {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90,
            Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount

          })
         
          console.log("item",item)
        }
      })


      setGetAllOgioOrders(ogio)
    }
  }, [getOgioProduct]);

  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
 //  const [messageApi, contextHolder] = antdMessage.useMessage();
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item: OgioBasicModel) => {
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
  }, [getOgioProduct])

  useEffect(() => {
    if (getPreOrderIds  &&
      getOgioRetailerDetails &&
      totalAmount&&
      totalNetBillAmount &&

      allOgioOrders &&
      allOgioOrders.length > 0  &&
      salesRepId &&
      getOgioNote
    ) {
      const   retailer_details={
        name:getOgioRetailerDetails.name,
        gstin:getOgioRetailerDetails.gstin,
        email:getOgioRetailerDetails.email,
        address:getOgioRetailerDetails.address,
        phone:getOgioRetailerDetails.phone
        }

      const now = new Date();
      const formattedTimestamp = now.toISOString();
      const data = {
          id: getPreOrderIds,
          order_date: formattedTimestamp,
          brand_id: 3,
          updated_at: formattedTimestamp,
          note:JSON.stringify(getOgioNote),
          retailer_details:JSON.stringify(retailer_details),
          user_id: getCurrentUsers.id,
          items: JSON.stringify(allOgioOrders),
          status: "Rejected",
          discount_type:"Inclusive",
          discount_percent:22,
          total_value:totalNetBillAmount,
          discount_amount:discountAmount,
          total_val_pre_discount:totalAmount,
          manager_id: managerUserId,
          retailer_id: getOgioRetailerDetails.id,
          salesrep_id: salesRepId??0,
        }
      rejectOrderOgio(getPreOrderIds)

    }

  }, [allOgioOrders, getOgioNote,getOgioRetailerDetails, totalNetBillAmount,discountAmount, managerUserId])
  const rejectOrderOgio = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Rejected",
      updated_at: formattedTimestamp
    }
    try {
      const response = await ApproveOrder(order);
      resetReject()
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetReject()
    }
  }
  return (
    <div></div>
  )
}

export default RejectedOgioOrder