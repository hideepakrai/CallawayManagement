import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getApparelNote, getPreOrderId } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { ApproveOrder } from '../../../orderApi/OrderAPi'
import GetAllorder from '../../../../orderPage/GetAllorder'

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

  const [isOrder, setIsOrder]= useState<boolean>(false)

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
      setIsOrder(true)
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetCompleted()
    }
  }

  const handleResetOrder=()=>{
    resetCompleted()
}
  return (
    <div>

{isOrder &&
        <GetAllorder

          resetOrder={handleResetOrder}
        />}
    </div>
  )
}

export default ApparelCompletedOrder