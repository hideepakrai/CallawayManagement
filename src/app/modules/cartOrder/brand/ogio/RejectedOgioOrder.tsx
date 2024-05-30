import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'

type Props = {
    resetReject: () => void
  }
const RejectedOgioOrder = ({ resetReject }: Props) => {


  const getPreOrderIds = useSelector(getPreOrderId)

  useEffect(() => {
    if (getPreOrderIds) {
      rejectOrderOgio(getPreOrderIds)

    }

  }, [getPreOrderIds]
  )

  const rejectOrderOgio = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Rejected",
      updated_at: formattedTimestamp
    }
    try {
      const response = await ApproveOrder(order);
      resetReject()
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetReject()
    }
  }
  return (
    <div></div>
  )
}

export default RejectedOgioOrder