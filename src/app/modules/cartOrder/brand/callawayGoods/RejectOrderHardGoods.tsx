import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId, getHardGoodsNote, getHardGoodsProducts, getHardGoodsRetailerDetail } from '../../../../slice/allProducts/CallAwayGoodsSlice'
import { ApproveOrder, } from '../../orderApi/OrderAPi'
import { CartModel } from '../../../model/CartOrder/CartModel'
import { BasicModelGoods } from "../../../model/goods/CallawayGoodsModel"
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice'
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel'
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'


type Props = {
  resetReject: () => void
}
const RejectOrderHardGoods = ({ resetReject }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)


  const [allHardGoodsOrders, setGetAllHardGoodsOrders] = useState<BasicModelGoods[]>([])
  const getActiveOrdertabs= useSelector(getActiveOrdertab)
  const getHardGoodsRetailerDetails= useSelector(getHardGoodsRetailerDetail) as RetailerModel;
  
  const getProduct: BasicModelGoods[] = useSelector(getHardGoodsProducts);
  useEffect(() => {
    const ogio: BasicModelGoods[] = [];
    if (getProduct && getProduct.length > 0) {
      getProduct.map((item) => {
        if (item.ordered && item.error88 === ""  ) {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
           // size: item.size,
            color:item.color,
            Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount

          })
          

        }
      })


      setGetAllHardGoodsOrders(ogio)
    }
  }, [getProduct]);



  const getTravisNotes= useSelector(getHardGoodsNote)
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountType, setDiscountType] = useState<string>()
  const [discountpercent, setDiscountPercent] = useState<number>()
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
 

  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
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
      }else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
       setManagerUserId(getCurrentUsers.manager_id);
     }
 
 
 
    }
  }, [getCurrentUsers])
  const getAllUsers=useSelector(getUserProfile)
  const [salesRepId, setSalesRepId]= useState<number>(0)
 useEffect(()=>{
  if(getAllUsers &&getAllUsers){
    getAllUsers.map((item)=>{
      if( item.id &&item.role==="Sales Representative"){
 
        setSalesRepId(item.id)
      }
    })
  }
 },[getAllUsers])


 useEffect(() => {
  if (getPreOrderIds &&
    getHardGoodsRetailerDetails &&
            getActiveOrdertabs==="hardgood"   &&
            allHardGoodsOrders &&
            totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getTravisNotes
  ) {

    const   retailer_details={
      name:getHardGoodsRetailerDetails.name,
      gstin:getHardGoodsRetailerDetails.gstin,
      email:getHardGoodsRetailerDetails.email,
      address:getHardGoodsRetailerDetails.address,
      phone:getHardGoodsRetailerDetails.phone
      }
      const now = new Date();
      const formattedTimestamp = now.toISOString();
      const data = {
          id: getPreOrderIds,
          order_date: formattedTimestamp,
          brand_id: 3,
          updated_at: formattedTimestamp,
          note:JSON.stringify(getTravisNotes),
          retailer_details:JSON.stringify(retailer_details),
          user_id: getCurrentUsers.id,
          items: JSON.stringify(allHardGoodsOrders),
          status: "Rejected",
          discount_type:"Inclusive",
          discount_percent:22,
          total_value:totalNetBillAmount,
          discount_amount:discountAmount,
          total_val_pre_discount:totalAmount,
          manager_id: managerUserId,
          retailer_id: getHardGoodsRetailerDetails.id,
          salesrep_id: salesRepId??0,
        }
        rejectOrderHardGood(data)

  }

}, [getActiveOrdertabs,getTravisNotes,totalNetBillAmount,discountAmount,
    getHardGoodsRetailerDetails,managerUserId,salesRepId,getPreOrderIds,allHardGoodsOrders])
 
  const rejectOrderHardGood = async (data: CartModel) => {
    const now = new Date();
    
    try {
      const response = await ApproveOrder(data);
      resetReject()
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetReject()
    }
  }
  return (
    <div>RejectOrderHardGoods</div>
  )
}

export default RejectOrderHardGoods