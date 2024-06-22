import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { addTravisNote, addPreOrderId, getTravisProducts, updateProgressStep, getPreOrderId } from '../../../../slice/allProducts/TravisMethewSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { CartModel } from '../../../model/CartOrder/CartModel'
import { CreateOrder } from '../../../cartOrder/orderApi/OrderAPi'


type Props = {
  resetCreatedOrder: () => void;
}
const CreatedOrder = ({ resetCreatedOrder }: Props) => {
  const dispatch = useDispatch()
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [typeOfAccount, settypeOfAccount] = useState<string>("")
  const [managerUserId, setManagerUserId] = useState<number | null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder] = useState(false);
 
  // getAll Order
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelTravis[]>([])
  const [brandId, setBrandId] = useState<number>()

const getPreOrderIds= useSelector(getPreOrderId)
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(() => {
        //

    //console.log("ytt")


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
      } else if (getCurrentUsers.role === "Retailer" && getCurrentUsers.manager_id){
        setManagerUserId(getCurrentUsers.manager_id);
      } else if (getCurrentUsers.role === "Admin" && getCurrentUsers.manager_id !=undefined) {
       settypeOfAccount(getCurrentUsers.role)
        setSalesRepId(0)
        setManagerUserId(getCurrentUsers.manager_id)
       // setUserId(getCurrentUsers.id)
      }


    }
  }, [getCurrentUsers])

  
  useEffect(() => {
    console.log("y2")
    const ogio: BasicModelTravis[] = [];
    if (getProduct && getProduct.length > 0 &&getPreOrderIds===0) {
      getProduct.map((item) => {
        if (item.ordered && item.error88 === "" && item.error90 === "") {
          ogio.push({
            sku: item.sku,
            mrp: item.mrp,
            stock_90: item.Quantity90 ? item.Quantity90 : 0,
            stock_88: item.Quantity88 ? item.Quantity88 : 0,
            size: item.size,
            color:item.color,
            //Amount:item.Amount,
            LessDiscountAmount:item.LessDiscountAmount,
            description:item.description,
            Amount:item.FinalBillValue,


            

          })


        }
      })


      setGetAllTravisOrders(ogio)
    }
  }, [getProduct,getPreOrderIds]);


  const getAllUsers=useSelector(getUserProfile)
  const [salesRepId, setSalesRepId]= useState<number>(0)
 useEffect(()=>{

  console.log("y3")
  if(getAllUsers &&getAllUsers){
    getAllUsers.map(item=>{
      if( item.id &&item.role==="Sales Representative"){

        setSalesRepId(item.id)
      }
    })
  }
 },[getAllUsers])


//  const getAllUs=useSelector(getUserProfile)
//  const [adminId, setAdminnId]= useState<number>(0)
//  useEffect(()=>{

//   console.log("y3")
//   if(getAllUs &&getAllUs){
//     getAllUs.map(item=>{
//       if( item.id &&item.role==="Admin"){

//         setAdminnId(item.id)
//       }
//     })
//   }
//  },[getAllUs])


  /// after getting product create order



  const getISTTime = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset();
    const istOffset = 330; // IST offset is +5:30 from UTC
    const istTime = new Date(now.getTime() + (istOffset - utcOffset) * 60000);
    return istTime.toISOString();
  };
  useEffect(() => {
       // 
    console.log("y4",managerUserId)
    if (allTravisOrders && 
      allTravisOrders.length > 0 &&
     
      managerUserId!=undefined
    ) {
      //const now = new Date();
      //const formattedTimestamp = now.toISOString();
      const formattedTimestamp = getISTTime();

      const data1={
        message: "Order Initiated ",
        name: getCurrentUsers?.name,
        date: formattedTimestamp,
        user_id:getCurrentUsers?.id,
        access:"all",
        type:"system"
}

      const data = {
        note: JSON.stringify(data1),
        order_date: formattedTimestamp,
        brand_id: 3,
        user_id: getCurrentUsers.id,
        items: JSON.stringify(allTravisOrders),
        status: "Pending",
        created_at: formattedTimestamp,
        updated_at: formattedTimestamp,
        manager_id: managerUserId,
        salesrep_id: salesRepId??0,


      }


      dispatch(addTravisNote({
        note:data1
      }))
      createOrder(data)
    }
  }, [allTravisOrders,salesRepId,managerUserId])


  const createOrder = async (data: CartModel) => {
    try {
      const response = await CreateOrder(data);
      if (response.status === 200) {

        const orderId = response?.data?.insertId
        dispatch(addPreOrderId({
          preOrderId: orderId,
        }))
        dispatch(updateProgressStep({
          progressStep: 0

        }))
      }
      resetCreatedOrder()

    }
    catch (err) {
      //dispatch(LoadingStop())
      // alert("Error on creating order")
      resetCreatedOrder()

    }
  }
 


  return (
    <div>

    </div>
  )
}

export default CreatedOrder