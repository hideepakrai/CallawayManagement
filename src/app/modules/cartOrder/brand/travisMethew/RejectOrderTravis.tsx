import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/TravisMethewSlice'
import { ApproveOrder, } from '../../orderApi/OrderAPi'


type Props = {
  resetReject: () => void
}
const RejectOrderTravis = ({ resetReject }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)

  useEffect(() => {
    if (getPreOrderIds) {
      rejectOrderTravis(getPreOrderIds)

    }

  }, [getPreOrderIds]
  )


  const rejectOrderTravis = async (ordreId: number) => {
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
    <div>RejectOrderTravis</div>
  )
}

export default RejectOrderTravis