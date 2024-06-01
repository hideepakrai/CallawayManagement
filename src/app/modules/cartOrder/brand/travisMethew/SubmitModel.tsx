import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { addNote } from '../../../../slice/allProducts/TravisMethewSlice';
import { Modal } from 'antd';
import "../../Note.css";

type Props = {
  isSubmit: boolean;
  onOkHandler: () => void;
  handleCancel: () => void;
};

const SubmitModel = ({ isSubmit, onOkHandler, handleCancel }: Props) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState<string>('');
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser;

  useEffect(() => {
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
        message: 'Order submitted',
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
  }, [notes, getCurrentUsers, dispatch]);


  const handleOk=()=>{
    onOkHandler()
    setNotes("")
  }
  return (
    <div>
      <Modal className='timeline submit-popup' title="Add Note" open={isSubmit} onOk={handleOk} onCancel={handleCancel}>
        <div className='row mt-8'>
          <h4 className='mb-3 fs-4' style={{ fontWeight: '500' }}>Do you want to submit Order</h4>
          <div className='col-12'>
            <TextArea
              rows={5}
              placeholder="Note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubmitModel;
