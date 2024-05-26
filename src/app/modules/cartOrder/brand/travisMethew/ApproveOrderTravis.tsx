import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/TravisMethewSlice'
import { ApproveOrder, UpdateOrder } from '../../orderApi/OrderAPi'


type Props={
    resetStatus:(status:string)=> void,
    statusUpdate:string
}
 const ApproveOrderTravis = ({resetStatus,statusUpdate}:Props) => {
    const getPreOrderIds= useSelector(getPreOrderId)
  
    useEffect(()=>{
        if(getPreOrderIds &&statusUpdate!=""){
           console.log("getPreOrderIds",getPreOrderIds) 
       approveOrderTravis (getPreOrderIds,statusUpdate)

        }

    },[getPreOrderIds,statusUpdate]
    )


    const approveOrderTravis =async(ordreId:number,statusUpdate:string)=>{
        const now = new Date();
      const formattedTimestamp = now.toISOString();
     const order={
        id:ordreId,
        status:statusUpdate,
        updated_at:formattedTimestamp
     }
        try{
  const response = await ApproveOrder(order);
  console.log("sttaus ",statusUpdate,response)
  resetStatus(statusUpdate)
        }catch(err){
            console.log(err)
            resetStatus("Approved failed")
        }
    }
    return (
    <div></div>
  )
}
export default ApproveOrderTravis;