import React, { useState, useEffect } from 'react'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import { useSelector } from 'react-redux';
import { getOgioNotes, getOgioProducts, getOgioRetailerDetail, getPreOrderId } from '../../../../slice/allProducts/OgioSlice';
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../../cartOrder/orderApi/OrderAPi';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';


type Props = {
    resetUpdateOrder: () => void,
    preorderId: number
  }
const UpdatePreOrderOgio = ({ resetUpdateOrder, preorderId }: Props) => {
    const ogioProduct: OgioBasicModel[] = useSelector(getOgioProducts);
      const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel
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
                Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount,
            product_type:item.product_type
    
              })
             
    
            }
          })
    
    
          setGetAllOgioOrders(ogio)
        }
      }, [ogioProduct,preorderId]);

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

      const getOgioNote= useSelector(getOgioNotes)
      const [totalAmount, setTotalAmount] = useState<number>()
      const [discountAmount, setDiscountAmount] = useState<number>()
      const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
     //  const [messageApi, contextHolder] = antdMessage.useMessage();
      useEffect(() => {
        let tAmount: number = 0;
        let totalBillAmount: number = 0;
        if (ogioProduct && ogioProduct.length > 0) {
          ogioProduct.map((item: OgioBasicModel) => {
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
      }, [ogioProduct])
      
      useEffect(() => {
        if (allOgioOrders && 
          allOgioOrders.length > 0 &&
          totalNetBillAmount &&
          discountAmount&&
          totalAmount &&
          salesRepId &&
          getOgioRetailerDetails &&
          getOgioNote
        ) {
          const   retailer_details={
            name:getOgioRetailerDetails?.name,
            gstin:getOgioRetailerDetails.gstin,
            email:getOgioRetailerDetails.email,
            address:getOgioRetailerDetails.address,
            phone:getOgioRetailerDetails.phone
            }
          const now = new Date();
          const formattedTimestamp = now.toISOString();
          const update = {
            id: getPreOrderOgioIds,
            order_date: formattedTimestamp,
            note:JSON.stringify(getOgioNote),
            brand_id: 4,
            retailer_details:JSON.stringify(retailer_details),
            user_id: getCurrentUsers.id,
            items: JSON.stringify(allOgioOrders),
            status: "Pending",
            discount_type:"Inclusive",
            discount_percent:22,
            total_value:totalNetBillAmount,
            discount_amount:discountAmount,
            total_val_pre_discount:totalAmount,
            updated_at: formattedTimestamp,
            manager_id: managerUserId,
             retailer_id: getOgioRetailerDetails.id,
            salesrep_id: salesRepId,
    
          }
          updateOrder(update)
        }
      }, [allOgioOrders,discountAmount,totalNetBillAmount,
        totalAmount,salesRepId,getOgioNote])


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

export default UpdatePreOrderOgio