import React, { useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import { getOgioNotes, getPreOrderId } from '../../../../slice/allProducts/OgioSlice'
import { ApproveOrder } from '../../orderApi/OrderAPi'
import GetAllorder from '../../../orderPage/GetAllorder'


type Props = {
    resetStatus: (status: string) => void,
   
}
const ApproveOrderOgio = ({resetStatus}:Props) => {
    const getPreOrderIds = useSelector(getPreOrderId)
    const getOgioNote= useSelector(getOgioNotes)

    useEffect(() => {
        if (getPreOrderIds &&getOgioNote ) {
            approveOrderOgio(getPreOrderIds)

        }

    }, [getPreOrderIds,getOgioNote ])
   const [isOrder, setIsOrder]= useState<boolean>(false)
    const approveOrderOgio = async (ordreId: number) => {
        const now = new Date();
        const formattedTimestamp = now.toISOString();
        const order = {
            id: ordreId,
            status: "Approved",
            updated_at: formattedTimestamp,
            note:JSON.stringify(getOgioNote)
        }
        try {
            const response = await ApproveOrder(order);
            if(response){
                setIsOrder(true)
               
            }
            
        } catch (err) {
            resetStatus("Approved failed")
        }
    }
    

    const handleResetOrder=()=>{
        setIsOrder(false)
        resetStatus("Approved")
    }
  return (
    <div>
         {isOrder && <GetAllorder
        resetOrder={handleResetOrder}
        />}

    </div>
  )
}

export default ApproveOrderOgio