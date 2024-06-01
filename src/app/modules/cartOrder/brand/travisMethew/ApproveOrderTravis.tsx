import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId, getTravisNote } from '../../../../slice/allProducts/TravisMethewSlice'
import { ApproveOrder, UpdateOrder } from '../../orderApi/OrderAPi'


type Props = {
    resetStatus: (status: string) => void,
    statusUpdate: string
}
const ApproveOrderTravis = ({ resetStatus, statusUpdate }: Props) => {
    const getPreOrderIds = useSelector(getPreOrderId)
    const getTravisNotes= useSelector(getTravisNote)
    useEffect(() => {
        if (getPreOrderIds && statusUpdate != "" &&getTravisNotes) {
            approveOrderTravis(getPreOrderIds, statusUpdate)

        }

    }, [getPreOrderIds, statusUpdate,getTravisNotes]
    )


    const approveOrderTravis = async (ordreId: number, statusUpdate: string) => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const order = {
            id: ordreId,
            status: statusUpdate,
            updated_at: formattedTimestamp,
            note:JSON.stringify(getTravisNotes)
        }
        try {
            const response = await ApproveOrder(order);
            if(response){
                resetStatus(statusUpdate)
            }
           
        } catch (err) {
            resetStatus("Approved failed")
        }
    }
    return (
        <div></div>
    )
}
export default ApproveOrderTravis;