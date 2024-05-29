import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/TravisMethewSlice'
import { ApproveOrder, } from '../../orderApi/OrderAPi'


type Props = {
  resetCompleted: () => void
}
const CompletedOrderTravis = ({ resetCompleted }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)

  useEffect(() => {
    if (getPreOrderIds) {
      completedOrderTravis(getPreOrderIds)

    }

  }, [getPreOrderIds]
  )


  const completedOrderTravis = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Complete",
      updated_at: formattedTimestamp
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

export default CompletedOrderTravis