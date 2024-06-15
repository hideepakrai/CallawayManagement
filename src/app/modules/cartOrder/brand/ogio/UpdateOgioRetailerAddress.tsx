import React, { useEffect, useState } from 'react'
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { useSelector } from 'react-redux';
import { getOgioNotes, getOgioProducts, getOgioRetailerDetail, getPreOrderId } from '../../../../slice/allProducts/OgioSlice';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../orderApi/OrderAPi';
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import { CurentUser } from '../../../model/useAccount/CurrentUser';



type Props = {
    resetOgioAddress:()=>void
}
const UpdateOgioRetailerAddress = ({resetOgioAddress}:Props) => {
    const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;
    const getPreOrderIds = useSelector(getPreOrderId);
    const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
    const [typeOfAccount, settypeOfAccount] = useState<string>("")
    const [managerUserId, setManagerUserId] = useState<number | null>()
    const [userId, setUserId] = useState<number>();
    const ogioProduct: OgioBasicModel[] = useSelector(getOgioProducts);

    const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
    const [brandId, setBrandId] = useState<number>()
    
    useEffect(() => {
        const ogio: OgioBasicModel[] = [];
        if (ogioProduct && ogioProduct.length > 0 &&getPreOrderIds) {
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
      }, [ogioProduct,getPreOrderIds]);



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
        else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
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
    
const getOgioNote= useSelector(getOgioNotes)

    useEffect(()=>{
        if(getOgioRetailerDetails &&
            getActiveOrdertabs==="ogio" &&
            getCurrentUsers  &&
            salesRepId &&
            managerUserId &&
            totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getOgioNote &&
      allOgioOrders
      
        ){
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
                    updated_at: formattedTimestamp,
                    retailer_details:JSON.stringify(retailer_details),
                    brand_id: 4,
                    note:JSON.stringify(getOgioNote),
                    user_id: getCurrentUsers.id,
                    items: JSON.stringify(allOgioOrders),
                    status: "Pending",
                    discount_type:"Inclusive",
                    discount_percent:22,
                    total_value:totalNetBillAmount,
                    discount_amount:discountAmount,
                    total_val_pre_discount:totalAmount,
                    manager_id: managerUserId,
                    retailer_id: getOgioRetailerDetails.id,
                    salesrep_id: salesRepId,
                  }
                  updateOrder(data)
        }
    },[getActiveOrdertabs,salesRepId,managerUserId,totalNetBillAmount,discountAmount,totalAmount,
      getOgioRetailerDetails,getPreOrderIds,getCurrentUsers,getOgioNote,allOgioOrders])


    const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetOgioAddress()
          }
    
    
        }
        catch (err) {
          //dispatch(LoadingStop())
          // alert("Error on creating order")
          resetOgioAddress()
    
        }
      }
  return (
    <div></div>
  )
}

export default UpdateOgioRetailerAddress