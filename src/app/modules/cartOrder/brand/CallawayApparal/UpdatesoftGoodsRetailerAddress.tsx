import React, { useEffect, useState } from 'react'
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { useSelector } from 'react-redux';
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice';
import { getApparelNote, getApparelProducts, getPreOrderId, getSoftgoodRetailerDetail } from '../../../../slice/allProducts/CallawayApparelSlice';
import { BasicModelApparel } from '../../../model/apparel/CallawayApparelModel';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../orderApi/OrderAPi';


type Props = {
    resetApparelAddress:()=>void
}
const UpdatesoftGoodsRetailerAddress = ({resetApparelAddress}:Props) => {
    const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getSoftgoodRetailerDetails= useSelector(getSoftgoodRetailerDetail) as RetailerModel;
    const getPreOrderIds = useSelector(getPreOrderId);
    const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
    const [typeOfAccount, settypeOfAccount] = useState<string>("")
    const [managerUserId, setManagerUserId] = useState<number | null>()
    const [userId, setUserId] = useState<number>();
    const getApparelProduct: BasicModelApparel[] = useSelector(getApparelProducts);

    const [allApparelOrders, setGetAllApparelOrders] = useState<BasicModelApparel[]>([])
    const [brandId, setBrandId] = useState<number>()
    
    useEffect(() => {
    
        const apparel: BasicModelApparel[] = [];
        if (getApparelProduct && getApparelProduct.length > 0 &&getPreOrderIds) {
          getApparelProduct.map((item) => {
            if (item.ordered && item.error90=== "" &&item.error88==="") {
                apparel.push({
                sku: item.sku,
                mrp: item.mrp,
                stock_90: item.Quantity90 ? item.Quantity90 : 0,
                stock_88:item.Quantity88 ? item.Quantity88 : 0,
                Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount,
            category:item.category,
    
              })
             
    
            }
          })
    
    
          setGetAllApparelOrders(apparel)
        }
      }, [getApparelProduct,getPreOrderIds]);



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
     if (getApparelProduct && getApparelProduct.length > 0) {
       getApparelProduct.map((item: BasicModelApparel) => {
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
   }, [getApparelProduct])
    
const getApparelNotes= useSelector(getApparelNote)

    useEffect(()=>{
    

      console.log("allApparelOrders",allApparelOrders)
        if(getSoftgoodRetailerDetails &&
            getActiveOrdertabs==="softgood" &&
            getCurrentUsers  &&
            salesRepId &&
            managerUserId &&
            totalAmount&&
      discountAmount &&
      totalNetBillAmount &&
      getApparelNotes &&
      allApparelOrders
      
        ){
            const   retailer_details={
                name:getSoftgoodRetailerDetails.name,
                gstin:getSoftgoodRetailerDetails.gstin,
                email:getSoftgoodRetailerDetails.email,
                address:getSoftgoodRetailerDetails.address,
                phone:getSoftgoodRetailerDetails.phone
                }
                const now = new Date();
                const formattedTimestamp = now.toISOString();
                const data = {
                    id: getPreOrderIds,
                    order_date: formattedTimestamp,
                    updated_at: formattedTimestamp,
                    retailer_details:JSON.stringify(retailer_details),
                    brand_id: 2,
                    note:JSON.stringify(getApparelNotes),
                    user_id: getCurrentUsers?.id,
                    items: JSON.stringify( allApparelOrders
                    ),
                    status: "Pending",
                    discount_type:"Inclusive",
                    discount_percent:22,
                    total_value:totalNetBillAmount,
                    discount_amount:discountAmount,
                    total_val_pre_discount:totalAmount,
                    manager_id: managerUserId,
                    retailer_id: getSoftgoodRetailerDetails.id,
                    salesrep_id: salesRepId,
                  }
                  updateOrder(data)
        }
    },[getActiveOrdertabs,salesRepId,managerUserId,totalNetBillAmount,discountAmount,totalAmount,
        getSoftgoodRetailerDetails,getPreOrderIds,getCurrentUsers,getApparelNotes,allApparelOrders])


    const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetApparelAddress()
          }
    
    
        }
        catch (err) {
          //dispatch(LoadingStop())
          // alert("Error on creating order")
          resetApparelAddress()
    
        }
      }
  return (
    <div></div>
  )
}

export default UpdatesoftGoodsRetailerAddress