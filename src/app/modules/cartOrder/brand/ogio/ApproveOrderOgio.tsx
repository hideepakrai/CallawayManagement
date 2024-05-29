import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'


type Props = {
    resetStatus: (status: string) => void,
   
}
const ApproveOrderOgio = ({resetStatus}:Props) => {
    const getPreOrderIds = useSelector(getPreOrderId)


    useEffect(() => {
        if (getPreOrderIds ) {
            approveOrderOgio(getPreOrderIds)

        }

    }, [getPreOrderIds, ])

    const approveOrderOgio = async (ordreId: number) => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const order = {
            id: ordreId,
            status: "Approved",
            updated_at: formattedTimestamp
        }
        try {
            const response = await ApproveOrder(order);
            if(response){
                resetStatus("Approved")
            }
            
        } catch (err) {
            resetStatus("Approved failed")
        }
    }
    
  return (
    <div>ApproveOrderOgio</div>
  )
}

export default ApproveOrderOgio