import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount } from '../../../../slice/UserSlice/UserSlice'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'

const CreatedOrder = () => {

    const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
  const getUserAccounts= useSelector(getUserAccount)
  const [ typeOfAccount, settypeOfAccount]= useState<string>("")
  const [ managerUserId, setManagerUserId]= useState<number|null>()
  const [userId, setUserId] = useState<number>();
  const [isOrder, setIsOrder]= useState(false);
    const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
    console.log("getCurrentUsers",getCurrentUsers)
  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger
   if (getCurrentUsers &&
     getCurrentUsers.role &&
     getCurrentUsers.id 
     ) {

       if(getCurrentUsers.role==="Manager"){
         settypeOfAccount(getCurrentUsers.role)
         setManagerUserId(getCurrentUsers.id)
         setUserId(getCurrentUsers.id)
       }else if(getCurrentUsers.role==="Sales Representative" &&getCurrentUsers.manager_id){
         settypeOfAccount(getCurrentUsers.role)
         
         setManagerUserId(getCurrentUsers.manager_id)
         setUserId(getCurrentUsers.id)
       }
       
    
   }
 }, [getCurrentUsers])
 
 // getAll Order
 const [ allTravisOrders, setGetAllTravisOrders]= useState<BasicModelTravis[]>([])
const [brandId, setBrandId]= useState<number>()
   
 useEffect(()=>{
   const ogio:BasicModelTravis[]=[];
   if(getProduct &&getProduct.length>0){
     getProduct.map((item)=>{
       if(item.ordered && item.error88===""  && item.error90===""&&item.brand_id){
         ogio.push({
           sku: item.sku,
           mrp: item.mrp,
           stock_90: item.Quantity90?item.Quantity90:0,
           stock_88:item.Quantity88?item.Quantity88:0,
           
         })
         setBrandId(item.brand_id)
         
       }
     })
    

     setGetAllTravisOrders(ogio)
   }
 },[getProduct]);

  return (
    <div>

    </div>
  )
}

export default CreatedOrder