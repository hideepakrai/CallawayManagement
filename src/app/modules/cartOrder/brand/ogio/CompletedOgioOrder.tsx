import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOgioNotes, getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'
import GetAllorder from '../../../orderPage/GetAllorder'


type Props = {
    resetCompleted: (message:string) => void
  }

const CompletedOgioOrder = ({ resetCompleted }: Props) => {
const getOgioNote= useSelector(getOgioNotes)
  const getPreOrderIds = useSelector(getPreOrderId)
  useEffect(() => {
    if (getPreOrderIds &&getOgioNote) {
      completedOrderOgio(getPreOrderIds)

    }

  }, [getPreOrderIds,getOgioNote]
  )
  const [isOrder, setIsOrder]= useState<boolean>(false)

  const completedOrderOgio = async (ordreId: number) => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const order = {
      id: ordreId,
      status: "Completed",
      updated_at: formattedTimestamp,
      note:JSON.stringify(getOgioNote)
      
    }
    try {
      const response = await ApproveOrder(order);
      if(response)
        setIsOrder(true)
      //   resetStatus(statusUpdate)
    } catch (err) {
      resetCompleted("Failed to Complete order")
    }
  }

//
  const handleResetOrder=()=>{
    resetCompleted("completed")
}

  return (
    <div>
         {isOrder && <GetAllorder
        resetOrder={handleResetOrder}
        />}
    </div>
  )
}

export default CompletedOgioOrder