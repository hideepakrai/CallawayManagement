import React, { useEffect, useState } from 'react'
import { BasicModelGoods, BasicModelGoodsGraph, ImageType } from "../../../model/goods/CallawayGoodsModel"
import { getGoodsProducts, getOtherProducts,getPreOrderId,getHardGoodsRetailerDetail,getHardGoodsNote } from "../../../../slice/allProducts/CallAwayGoodsSlice"
import { useSelector, useDispatch } from 'react-redux'
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { getRetailerDetails } from "../../../../slice/orderSlice/callawayGoods/HardGoodsOrderDetail"
import { LoadingStart, LoadingStop } from '../../../../slice/loading/LoadingSlice';
import { CreateOrder, UpdateOrder } from '../../orderApi/OrderAPi';
import GetAllorder from '../../../orderPage/GetAllorder';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';

type Props = {
  totalNetBillAmount: number;
  discountType: string;
  discountValue: number;
  resetSubmitOrder: () => void,
  //note: string,
  
  totalAmount:number,
  discountAmount:number
}

const CallawaySubmitOrder = ({ totalNetBillAmount, discountValue, discountType, resetSubmitOrder, totalAmount,discountAmount }: Props) => {
  const getProduct: BasicModelGoods[] = useSelector(getGoodsProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
  const dispatch = useDispatch()
  const getPreOrderIds = useSelector(getPreOrderId);
  const getHardGoodsNotes= useSelector(getHardGoodsNote)
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
  const [allHardGoodsOrders, setGetallHardGoodsOrders] = useState<BasicModelGoods[]>([])
  const [brandId, setBrandId] = useState<number>()

  useEffect(() => {
    const ogio: BasicModelGoods[] = [];
    if (getProduct && getProduct.length > 0) {
      getProduct.map((item) => {
        if (item.ordered &&  item.error88 === "" ) {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
           // stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,

          })

        }
      })


      setGetallHardGoodsOrders(ogio)
    }
  }, [getProduct]);

  const getHardGoodsRetailerDetails= useSelector(getHardGoodsRetailerDetail) as RetailerModel;

  //getAlll retailer detail 
  const getRetailerDetail = useSelector(getRetailerDetails)
  useEffect(() => {
  


    if (getRetailerDetail &&
      allHardGoodsOrders && allHardGoodsOrders.length > 0 &&
      getHardGoodsRetailerDetails&&
      discountAmount&&
      totalNetBillAmount &&
      discountValue &&
      discountType &&
      totalAmount&&
      getPreOrderIds &&
                       
      getHardGoodsNotes

    ) {
      handleCreateOrder()
    }

  }, [allHardGoodsOrders, getRetailerDetail, totalNetBillAmount, discountType, discountValue, managerUserId, brandId])


  const handleCreateOrder = () => {

    dispatch(LoadingStart());
   // const orderId = generateUniqueNumeric();
    const now = new Date();
    const formattedTimestamp = now.toISOString();

    if (Array.isArray(allHardGoodsOrders)) {
      const   retailer_details={
        name:getHardGoodsRetailerDetails.name,
        gstin:getHardGoodsRetailerDetails.gstin,
        email:getHardGoodsRetailerDetails.email,
        address:getHardGoodsRetailerDetails.address,
        phone:getHardGoodsRetailerDetails.phone
        }
      const data = {
        // id: getPreOrderIds,
        // order_date: "",
        // note: note,
        // brand_id: 1,
        // user_id: getCurrentUsers.id,
        // items: JSON.stringify(allHardGoodsOrders),
        // discount_type: discountType,
        // discount_percent: discountValue,
        // total_value: totalNetBillAmount,
        // status: "Pending",
        // manager_id: managerUserId,
        // retailer_id: getRetailerDetail.retailerId,
        // salesrep_id: 111
        id: getPreOrderIds,
        order_date: formattedTimestamp,
        note: JSON.stringify(getHardGoodsNotes),
        brand_id: 1,
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allHardGoodsOrders),
        discount_type: discountType,
        discount_percent: discountValue,
        total_value:  totalNetBillAmount,
        discount_amount: discountAmount,
        total_val_pre_discount:totalAmount,
        status: "submitted",
        manager_id: managerUserId,
        retailer_id: getRetailerDetail.retailerId,
        salesrep_id: salesRepId??0,
        updated_at: formattedTimestamp,
        retailer_details:JSON.stringify(retailer_details)
      




      }

      createOrder(data)
    }
  }

  function generateUniqueNumeric(): string {
    const timestamp = new Date().getTime().toString().substr(-5); // Get last 5 digits of timestamp
    const randomDigits = Math.floor(Math.random() * 100000); // Generate random 5-digit number
    const paddedRandomDigits = String(randomDigits).padStart(5, '0'); // Pad random number with leading zeros if necessary
    const uniqueId = timestamp + paddedRandomDigits; // Combine timestamp and random number
    return uniqueId;
  }


 // const [orderId, setOrderId] = useState<number>(0)
  const [reLoadUserAccount, setReloadUserAccount] = useState(false)
  const createOrder = async (data: CartModel) => {
    try {
      const response = await UpdateOrder(data);
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
    setGetallHardGoodsOrders([])
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

export default CallawaySubmitOrder

