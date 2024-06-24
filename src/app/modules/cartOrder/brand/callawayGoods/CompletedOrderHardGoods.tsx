import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId, getHardGoodsNote } from '../../../../slice/allProducts/CallAwayGoodsSlice'
import { ApproveOrder, } from '../../orderApi/OrderAPi'


type Props = {
  resetCompleted: () => void
}
const CompletedHardGoods = ({ resetCompleted }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)
  const getHardGoodsNotes= useSelector(getHardGoodsNote)
  useEffect(() => {
    if (getPreOrderIds && getHardGoodsNotes) {
        completedOrderHardGoods(getPreOrderIds)

    }

  }, [getPreOrderIds,getHardGoodsNotes]
  )


  const completedOrderHardGoods = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Completed",
      updated_at: formattedTimestamp,
      note:JSON.stringify(getHardGoodsNotes)
    }
    try {
      const response = await ApproveOrder(order);
      resetCompleted()
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetCompleted()
    }
  }
  return (
    <div>RejectOrderTravis</div>
  )
}

export default CompletedHardGoods