import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux"

import "../../Note.css"
import { Modal } from 'antd'
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { addHardGoodsNote } from '../../../../slice/allProducts/CallAwayGoodsSlice'
type Props = {
    isApprove:boolean
    onOkHandler:() => void
    handleCancel:() => void
}
const HardGoodsApproveModel = ({isApprove,onOkHandler,handleCancel}:Props) => {

    console.log("SubmitModel",isApprove)
    const dispatch = useDispatch()
    const [addNotes, setAddNotes] = useState<string>('');
  const [notes, setnotes]= useState<string>("")
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser


  const handleOk=()=>{
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    if (notes !== '' && getCurrentUsers) {
        const data1 = {
          message: notes,
          name: getCurrentUsers?.name,
          date: formattedTimestamp,
          user_id: getCurrentUsers?.id,
          access: 'all',
          type: 'user',
        };
        dispatch(addHardGoodsNote({
          note: data1,
        }));
      
      } else if (notes === '' && getCurrentUsers) {
        const data1 = {
          message: 'Order approve',
          name: getCurrentUsers?.name,
          date: formattedTimestamp,
          user_id: getCurrentUsers?.id,
          access: 'all',
          type: 'system',
        };
        dispatch(addHardGoodsNote({
          note: data1,
        }));
      
      }
    onOkHandler()
    setnotes("")
  }
    return (
    <div>
           <Modal className='timeline submit-popup' title="Add Note" open={isApprove} onOk={handleOk} onCancel={handleCancel}>
            <div className='row mt-8'>
                {/* <div className='col-7'>

                    <Timeline>
                        <Timeline.Item color="black ">
                          
                            <p className="text-gray-800 fs-5 fw-semibold">Note by <i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
                        </Timeline.Item>
                       
                        
                    </Timeline>
                </div> */}
                <h4 className='mb-3 fs-4' style={{fontWeight:"500"}}>Do you want to approve Order</h4>

                <div className='col-12'>
                    <TextArea
                        rows={5}
                        placeholder="Note"
                        value={notes}
                        onChange={(e) => setnotes(e.target.value)}
                    />
                </div>
                </div>
            </Modal>
    </div>
  )
}

export default HardGoodsApproveModel