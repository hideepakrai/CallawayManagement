import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { addTravisNote } from '../../../../slice/allProducts/TravisMethewSlice';
import { Modal } from 'antd';
import "../../Note.css";

type Props = {
  isReject: boolean;
  onOkHandler: () => void;
  handleCancel: () => void;
};

const TravisRejectedModel = ({ isReject, onOkHandler, handleCancel }: Props) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>('');
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser;

  useEffect(() => {
    const now = new Date();
    const formattedTimestamp = now.toISOString();

   
  }, [notes, getCurrentUsers, dispatch]);


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
        dispatch(addTravisNote({
          note: data1,
        }));
      
      } else if (notes === '' && getCurrentUsers) {
        const data1 = {
          message: 'Order Rejected',
          name: getCurrentUsers?.name,
          date: formattedTimestamp,
          user_id: getCurrentUsers?.id,
          access: 'all',
          type: 'system',
        };
        dispatch(addTravisNote({
          note: data1,
        }));
      
      }
    onOkHandler()
    setNotes("")
  }
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div>
      <Modal className='timeline submit-popup' title="Do you want to submit Order" open={isReject} onOk={handleOk} onCancel={handleCancel}>
      <div className='row mt-6 mb-6 '>
           {/* <h4 className='mb-3 fs-2 text-black' style={{ fontWeight: '500' }}>Do you want to submit Order</h4>  */}
          <div className="form-check form-check-custom form-check-solid mx-3 mt-2 cursor-pointer">
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
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TravisRejectedModel;
