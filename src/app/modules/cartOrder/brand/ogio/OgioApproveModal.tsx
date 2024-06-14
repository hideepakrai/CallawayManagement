import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux"

import "../../Note.css"
import { Modal,Button } from 'antd'
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice'
import { CurentUser } from '../../../model/useAccount/CurrentUser'
import { addNote } from '../../../../slice/allProducts/OgioSlice'

type Props = {
    isApprove:boolean
    onOkHandler:() => void
    handleCancel:() => void
}
const OgioApproveModel = ({isApprove,onOkHandler,handleCancel}:Props) => {

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
        dispatch(addNote({
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
        dispatch(addNote({
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
           <Modal className='timeline submit-popup'  open={isApprove}
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
               <div className='pt-8 pb-3 text-center '>
          <h4 className='fs-2'>Do you want to Approve Order?</h4>
          <h5 className='fs-5 pt-4 text-Secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit.

          </h5>
        </div>

            {/* <div className='row mt-8'>
               

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

                </div> */}
            </Modal>
    </div>
  )
}

export default OgioApproveModel