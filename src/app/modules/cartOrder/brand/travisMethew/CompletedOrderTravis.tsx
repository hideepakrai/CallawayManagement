import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPreOrderId, getTravisNote } from '../../../../slice/allProducts/TravisMethewSlice'
import { ApproveOrder, } from '../../orderApi/OrderAPi'
import { resetActive } from '../../../../slice/activeTabsSlice/ActiveTabSlice'


type Props = {
  resetCompleted: () => void
}
const CompletedOrderTravis = ({ resetCompleted }: Props) => {
   const dispatch= useDispatch()
  const getPreOrderIds = useSelector(getPreOrderId)
  const getTravisNotes= useSelector(getTravisNote)
  useEffect(() => {
    if (getPreOrderIds && getTravisNotes) {
      completedOrderTravis(getPreOrderIds)

    }

  }, [getPreOrderIds,getTravisNotes]
  )


  const completedOrderTravis = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Complete",
      updated_at: formattedTimestamp,
      note:JSON.stringify(getTravisNotes)
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

export default CompletedOrderTravis