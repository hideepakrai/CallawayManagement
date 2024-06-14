import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux"

import "../../Note.css"
import { Modal,Button } from 'antd'
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { addHardGoodsNote } from '../../../../slice/allProducts/CallAwayGoodsSlice'
type Props = {
    iscompleted:boolean
    onOkHandler:() => void
    handleCancel:() => void
}
const HardGoodsCompleteModel = ({iscompleted,onOkHandler,handleCancel}:Props) => {

    console.log("SubmitModel",iscompleted)
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
              message: 'Order submitted',
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

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };


   return (
    <div>
         <Modal className='timeline submit-popup' title="Do you want to Complete Order" open={iscompleted}
          // onOk={handleOk}
           onCancel={handleCancel}
          footer={[
            <Button key="no" onClick={handleCancel}>
              No
            </Button>,
            <Button key="yes" type="primary" onClick={handleOk}>
              Yes
            </Button>
          ]}
          >
            <div className='row mt-8'>
                {/* <div className='col-7'>

                    <Timeline>
                        <Timeline.Item color="black ">
                          
                            <p className="text-gray-800 fs-5 fw-semibold">Note by <i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
                        </Timeline.Item>
                       
                        
                    </Timeline>
                </div> */}
              
              <div className="form-check form-check-custom form-check-solid mx-3  cursor-pointer">
            <input
              className="form-check-input submit-order"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label fs-4 text-gray-700 cursor-pointer" style={{ fontWeight: "500" }}>
              Add Note
            </label>
          </div>
          

              {isChecked && (
                <div className='col-12 mt-4'>
                    <TextArea
                        rows={5}
                        placeholder="Note"
                        value={notes}
                        onChange={(e) => setnotes(e.target.value)}
                    />
                </div>
              )}

                </div>
            </Modal>
    </div>
  )
}

export default HardGoodsCompleteModel