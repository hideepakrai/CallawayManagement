import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../../slice/UserSlice/UserSlice';
import { getApparelNote, getApparelProducts, getPreOrderId, getSoftgoodRetailerDetail } from '../../../../../slice/allProducts/CallawayApparelSlice';
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import { CurentUser } from '../../../../model/useAccount/CurrentUser';
import { RetailerModel } from '../../../../model/AccountType/retailer/RetailerModel';
import { LoadingStart, LoadingStop } from '../../../../../slice/loading/LoadingSlice';
import { CartModel } from '../../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../../orderApi/OrderAPi';
import GetAllorder from '../../../../orderPage/GetAllorder';

type Props = {
  totalNetBillAmount: number;
  discountType: string;
  discountValue: number;
  resetSubmitOrder: () => void,
 
  totalAmount:number,
  discountAmount:number
}

const SubmitSoftOrder = ({ totalNetBillAmount, discountValue, totalAmount,discountAmount,discountType, resetSubmitOrder }: Props) => {
  const getApparelProduct: BasicModelApparel[] = useSelector(getApparelProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
  const dispatch = useDispatch()
  const getPreOrderIds = useSelector(getPreOrderId);
 const getAllUsers=useSelector(getUserProfile)
 const getApparelNotes= useSelector(getApparelNote)
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
      }else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
        setManagerUserId(getCurrentUsers.manager_id);
      }



    }
  }, [getCurrentUsers])

  // getAll Order
  const [allPreOrderSoftGoood, setAllPreOrderSoftGoood]= useState<BasicModelApparel[]>([])
  const [brandId, setBrandId] = useState<number>()
 
  useEffect(() => {
    const softGood: BasicModelApparel[] = [];

    if (getApparelProduct && getApparelProduct.length > 0) {
      getApparelProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "" ) {
            softGood.push({
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
      })


      setAllPreOrderSoftGoood(softGood)
    }
  }, [getApparelProduct]);

  const getSoftgoodRetailerDetails= useSelector(getSoftgoodRetailerDetail) as RetailerModel;
  

  useEffect(() => {

    
    if (
      allPreOrderSoftGoood && allPreOrderSoftGoood.length > 0 &&
      getSoftgoodRetailerDetails&&
      discountAmount&&
      totalNetBillAmount &&
      discountValue &&
      discountType &&
      totalAmount&&
     
      getPreOrderIds &&
     
      getApparelNotes
  

    ) {
      handleCreateOrder()
    }

  }, [allPreOrderSoftGoood, getApparelNotes,getSoftgoodRetailerDetails, totalNetBillAmount,discountAmount,totalAmount, discountType, discountValue, managerUserId, brandId, getPreOrderIds,salesRepId])


  const handleCreateOrder = () => {

    dispatch(LoadingStart());
    //const orderId = generateUniqueNumeric();
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    

    if (Array.isArray(allPreOrderSoftGoood)) {
      const   retailer_details={
        name:getSoftgoodRetailerDetails.name,
        gstin:getSoftgoodRetailerDetails.gstin,
        email:getSoftgoodRetailerDetails.email,
        address:getSoftgoodRetailerDetails.address,
        phone:getSoftgoodRetailerDetails.phone
        }

      const data = {
        id: getPreOrderIds,
        order_date: formattedTimestamp,
        note: JSON.stringify(getApparelNotes),
        brand_id: brandId,
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allPreOrderSoftGoood),
        discount_type: discountType,
        discount_percent: discountValue,
        total_value:  totalNetBillAmount,
        discount_amount: discountAmount,
        total_val_pre_discount:totalAmount,
        status: "submitted",
        manager_id: managerUserId,
        retailer_id: getSoftgoodRetailerDetails.id,
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


  const [orderId, setOrderId] = useState<number>(0)
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
   // settypeOfAccount("")
   setAllPreOrderSoftGoood([])
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

export default SubmitSoftOrder

