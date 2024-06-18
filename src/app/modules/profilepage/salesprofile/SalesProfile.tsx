import React, {useState, useEffect} from 'react';
import { Row, Col, Card, Tabs } from 'antd'; // Import Row and Col components from Ant Design

import PendingOrder from './PendingOrder';
import AllOrder from '../managerprofile/AllOrders';
import Contact from './Contact';
import { contactLists } from './ContactList';
import { useDispatch, useSelector } from 'react-redux';
import AllPendingOrder from '../managerprofile/AllPendingOrder';
import Friend from '../managerprofile/Friend';
import { CurentUser } from '../../model/useAccount/CurrentUser';
import GetAllorder from '../../orderPage/GetAllorder';
import { getCurrentUser } from '../../../slice/UserSlice/UserSlice';
import { LoadingStop, getLoading } from '../../../slice/loading/LoadingSlice';
import Friends from '../managerprofile/Friend';
const SalesProfile = () => {
  const [isOrder, setIsOrder] = useState(false);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const getLoadings = useSelector(getLoading)
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser

  useEffect(() => {
    if (getCurrentUsers && getCurrentUsers.id) {

      setIsOrder(true)
    }
  }, [])

  const handleResetOrder = () => {
    dispatch(LoadingStop())
    setIsOrder(false)

  }
    const items = [
    {
      key: '1',
      label: 'Pending Orders',
      children: <AllPendingOrder />,
    },
    {
      key: '2',
      label: 'Completed Orders',
      children: <AllOrder />,
    },
    {
      key: '3',
      label: 'Support',
      children:  <Friends />,
    },
  ];
  return (
    <div className='content-pro'>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="d-flex ">
            <div className='profile-page'>
              <img src='https://via.placeholder.com/150' alt="Profile"></img>
            </div>
            <div className='pt-5 mx-6'>
              <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3">{getCurrentUsers?.name}</h1>
              <h2 className="d-flex text-white fw-bold my-1 fs-3">Sales Representative</h2>
            </div>
          </div>
          <div className="d-flex align-items-center py-1">
            <div className="me-4">
              <a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-white" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                <i className="bi bi-pencil-fill icon-order"></i>Edit
              </a>
            </div>
          </div>
        </div>
      </div>

<Row className='container'>

          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section  table-orders'>
            <Card className=''>
            <Tabs defaultActiveKey="1" items={items} />
            </Card>
          </Col>


          {/* <Col xl={24} lg={18} md={14} sm={24} xs={24} className='user-left-section'>
            <Friends />
          </Col> */}
        </Row>

{isOrder &&
          <GetAllorder

            resetOrder={handleResetOrder}
          />}

    </div>
    
    
  );
};

export default SalesProfile;
