import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId, getHardGoodsNote } from '../../../../slice/allProducts/CallAwayGoodsSlice'
import { ApproveOrder, UpdateOrder } from '../../orderApi/OrderAPi'


type Props = {
    resetStatus: (status: string) => void,
    statusUpdate: string
}
const ApproveOrderHardGoods = ({ resetStatus, statusUpdate }: Props) => {
    const getPreOrderIds = useSelector(getPreOrderId)
    const getHardGoodsNotes = useSelector(getHardGoodsNote)
    useEffect(() => {
        if (getPreOrderIds && statusUpdate != "" &&getHardGoodsNotes) {
            approveOrderHardGoods(getPreOrderIds, statusUpdate)

        }

    }, [getPreOrderIds, statusUpdate,getHardGoodsNotes]
    )


    const approveOrderHardGoods = async (ordreId: number, statusUpdate: string) => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const order = {
            id: ordreId,
            status: statusUpdate,
            updated_at: formattedTimestamp,
            note:JSON.stringify(getHardGoodsNotes)
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
export default ApproveOrderHardGoods;