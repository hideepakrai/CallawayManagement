import React, { useEffect, useState } from 'react'
import { UpdateOrder } from '../../orderApi/OrderAPi';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { useSelector } from 'react-redux';
import { getPreOrderId, getTravisNote, getTravisProducts, getTravisRetailerDetail } from '../../../../slice/allProducts/TravisMethewSlice';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';


type Props = {
    resetAddress:()=>void
}
const UpdateTravisRetailerAddress = ({resetAddress}:Props) => {
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelTravis[]>([])
    const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getTravisRetailerDetails= useSelector(getTravisRetailerDetail) as RetailerModel;
    const getPreOrderIds = useSelector(getPreOrderId);
    const getProduct: BasicModelTravis[] = useSelector(getTravisProducts);
    useEffect(() => {
      const ogio: BasicModelTravis[] = [];
      if (getProduct && getProduct.length > 0) {
        getProduct.map((item) => {
          if (item.ordered && item.error88 === "" && item.error90 === "" && item.brand_id ) {
            ogio.push({
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
  
  
        setGetAllTravisOrders(ogio)
      }
    }, [getProduct]);

    const getTravisNotes= useSelector(getTravisNote)
 const [totalAmount, setTotalAmount] = useState<number>()
 const [discountAmount, setDiscountAmount] = useState<number>()
 const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
//  const [messageApi, contextHolder] = antdMessage.useMessage();
 useEffect(() => {
   let tAmount: number = 0;
   let totalBillAmount: number = 0;
   if (getProduct && getProduct.length > 0) {
     getProduct.map((item: BasicModelTravis) => {
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
       setSalesRepId(getCurrentUsers.id)
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
   getAllUsers.map(item=>{
     if( item.id &&item.role==="Sales Representative"){

       setSalesRepId(item.id)
     }
   })
 }
},[getAllUsers])



    useEffect(()=>{
        if(getTravisRetailerDetails &&
            getActiveOrdertabs==="travis"   &&
            allTravisOrders &&
            totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getTravisNotes


        ){
            const   retailer_details={
                name:getTravisRetailerDetails.name,
                gstin:getTravisRetailerDetails.gstin,
                email:getTravisRetailerDetails.email,
                address:getTravisRetailerDetails.address,
                phone:getTravisRetailerDetails.phone
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
                    items: JSON.stringify(allTravisOrders),
                    status: "Pending",
                    discount_type:"Inclusive",
                    discount_percent:22,
                    total_value:totalNetBillAmount,
                    discount_amount:discountAmount,
                    total_val_pre_discount:totalAmount,
                    manager_id: managerUserId,
                    retailer_id: getTravisRetailerDetails.id,
                    salesrep_id: salesRepId??0,
                  }
                  updateOrder(data)
        }
    },[getActiveOrdertabs,getTravisNotes,totalNetBillAmount,discountAmount,
  getTravisRetailerDetails,managerUserId,salesRepId,getPreOrderIds,allTravisOrders])

    const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetAddress()
          }
        }
        catch (err) {
          //dispatch(LoadingStop())
          // alert("Error on creating order")
          resetAddress()
    
        }
      }

  return (
    <div></div>
  )
}

export default UpdateTravisRetailerAddress
