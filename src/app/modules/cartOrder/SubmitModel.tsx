import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux"
import { getCurrentUser } from '../../slice/UserSlice/UserSlice'
import { CurentUser } from '../model/useAccount/CurrentUser'
import {addNote} from "../../slice/allProducts/TravisMethewSlice"
import "./Note.css"
import { Modal } from 'antd'
type Props = {
    isSubmit:boolean
    onOkHandler:() => void
    handleCancel:() => void
}
const SubmitModel = ({isSubmit,onOkHandler,handleCancel}:Props) => {

    console.log("SubmitModel",isSubmit)
    const dispatch = useDispatch()
    const [addNotes, setAddNotes] = useState<string>('');
  const [notes, setnotes]= useState<string>("")
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(()=>{
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    if(notes!="" &&getCurrentUsers){
        const data1={
            message:notes,
            name: getCurrentUsers?.name,
            date: formattedTimestamp,
            user_id:getCurrentUsers?.id,
            access:"all",
            type:"system"
    }
        dispatch(addNote({
            note:data1
        }))
    }
  },[notes,getCurrentUsers])
    return (
    <div>
          <Modal className='timeline submit-popup' title="Add Note" open={isSubmit} onOk={onOkHandler} onCancel={handleCancel}>
            <div className='row mt-8'>
                {/* <div className='col-7'>

                    <Timeline>
                        <Timeline.Item color="black ">
                          
                            <p className="text-gray-800 fs-5 fw-semibold">Note by <i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
                        </Timeline.Item>
                       
                        
                    </Timeline>
                </div> */}
                <h4 className='mb-3 fs-4' style={{fontWeight:"500"}}>Do you want to submit the Order</h4>

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

export default SubmitModel