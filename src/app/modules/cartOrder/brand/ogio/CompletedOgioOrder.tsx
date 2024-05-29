import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'


type Props = {
    resetCompleted: (message:string) => void
  }

const CompletedOgioOrder = ({ resetCompleted }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)
  useEffect(() => {
    if (getPreOrderIds) {
      completedOrderOgio(getPreOrderIds)

    }

  }, [getPreOrderIds]
  )

  const completedOrderOgio = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Complete",
      updated_at: formattedTimestamp
    }
    try {
      const response = await ApproveOrder(order);
      if(response)
      resetCompleted("completed")
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetCompleted("Failed to Complete order")
    }
  }


  return (
    <div>CompletedOgioOrder</div>
  )
}

export default CompletedOgioOrder