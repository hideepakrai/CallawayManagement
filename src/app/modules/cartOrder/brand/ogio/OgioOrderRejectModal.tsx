import React, { useEffect, useState } from 'react';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { addNote, getPreOrderId, getOgioRetailerDetail } from '../../../../slice/allProducts/OgioSlice';
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  isReject: boolean;
  onOkHandler: () => void;
  handleCancel: () => void;
};

const OgioOrderRejectModal = ({ isReject, onOkHandler, handleCancel }: Props) => {
  const getPreOrderIds = useSelector(getPreOrderId);
  const getActiveOrdertabs = useSelector(getActiveOrdertab);
  const getOgioRetailerDetails = useSelector(getOgioRetailerDetail) as RetailerModel[];
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser;

  useEffect(() => {
    // Perform any necessary updates when notes, getCurrentUsers, or dispatch change
  }, [notes, getCurrentUsers, dispatch]);

  const handleOk = () => {
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
        message: 'Order Rejected',
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
    onOkHandler();
    setNotes('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <Modal className='timeline submit-popup'
        open={isReject}
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
          <h4 className='fs-2'>Do you want to Reject Order?</h4>
          <h5 className='fs-5 pt-4 text-Secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
        </div>
      </Modal>
    </div>
  );
};

export default OgioOrderRejectModal;
