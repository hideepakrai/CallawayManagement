import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getApparelNote, getPreOrderId } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { ApproveOrder } from '../../../orderApi/OrderAPi'

type Props = {
  resetCompleted: () => void
}
const ApparelCompletedOrder = ({ resetCompleted }: Props) => {

  const getPreOrderIds = useSelector(getPreOrderId)
  const getApparelNotes= useSelector(getApparelNote)
  useEffect(() => {
    if (getPreOrderIds && getApparelNotes) {
      completedOrderTravis(getPreOrderIds)

    }

  }, [getPreOrderIds,getApparelNotes]
  )


  const completedOrderTravis = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Complete",
      updated_at: formattedTimestamp,
      note:JSON.stringify(getApparelNotes)
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
    <div></div>
  )
}

export default ApparelCompletedOrder