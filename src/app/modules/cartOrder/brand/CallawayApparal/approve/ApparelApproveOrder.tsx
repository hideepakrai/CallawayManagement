import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getApparelNote, getPreOrderId } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { ApproveOrder } from '../../../orderApi/OrderAPi'


type Props = {
    resetStatus: (status: string) => void,
    statusUpdate:string
}
const ApparelApproveOrder = ({ resetStatus ,statusUpdate}: Props) => {
    const getPreOrderIds = useSelector(getPreOrderId)
    const getApparelNotes= useSelector(getApparelNote)
    useEffect(() => {
        if (getPreOrderIds  &&getApparelNotes) {
            approveOrderTravis(getPreOrderIds, statusUpdate)

        }

    }, [getPreOrderIds, statusUpdate,getApparelNotes]
    )


    const approveOrderTravis = async (ordreId: number, statusUpdate: string) => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const order = {
            id: ordreId,
            status: statusUpdate,
            updated_at: formattedTimestamp,
            note:JSON.stringify(getApparelNotes)
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
export default ApparelApproveOrder;