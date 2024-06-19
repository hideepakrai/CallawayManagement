import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, getUserAccount } from "../../../slice/UserSlice/UserSlice";
import { getLoading, LoadingStop, LoadingStart } from "../../../slice/loading/LoadingSlice";
import Loading from '../../../modules/loading/Loading';
import ManagerSlider from './ManagerSlider';
import GetAllorder from '../../orderPage/GetAllorder';
import profilelogo from "../../../../../public/media/logos/favicon-icon.png";
import AllPendingOrder from './AllPendingOrder';
import AllOrder from './AllOrders';
import Friends from './Friend';
import "./ManagerProfile.css";
import { Card } from 'react-bootstrap';

const ManagerProfile = () => {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const getLoadings = useSelector(getLoading);
  const getCurrentUsers = useSelector(getCurrentUser);
  const [isOrder, setIsOrder] = useState(false);

  useEffect(() => {
    if (getCurrentUsers && getCurrentUsers.id) {
      setIsOrder(true);
    }
  }, [getCurrentUsers]);

  const handleResetOrder = () => {
    dispatch(LoadingStop());
    setIsOrder(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

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
      label: 'Users',
      children:  <Friends />,
    },
  ];

  return (
    <div>
      <ManagerSlider />

      <div className='content-pro'>
        <div className="toolbar pb-20 mb-3" id="kt_toolbar">
          <div id="kt_toolbar_container" className="container d-flex flex-stack">
            <div className="d-flex">
              <div className='profile-page'>
                <img style={{ backgroundColor: "#ddd" }} src={profilelogo} alt="Profile" />
                <span className="d-flex text-white my-1 fs-5 profle-role">Manager</span>
              </div>

              <div className='pt-3 mx-6'>
                <h1 className="d-flex text-white fw-light my-1 fs-1 pb-2 fw-bold">{getCurrentUsers?.name}</h1>
                <a href='#'>
                  <span className="gx-mb-0 fw-semibold text-hover-secondary text-gray-400 fs-4">
                    {getCurrentUsers?.email}
                    
                    <Tooltip title={copied ? 'Copied!' : 'Copy'} overlayInnerStyle={{ backgroundColor: 'white', color: 'black' }}>
                      <i
                        className={`bi ${copied ? 'bi-copy' : 'bi-copy'} mx-2 cursor-pointer text-gray-500 text-hover-dark`}
                        onClick={() => getCurrentUsers?.email && copyToClipboard(getCurrentUsers?.email)}
                      ></i>
                    </Tooltip>
                  </span>
                </a>
              </div>


            </div>
            
            <div className="d-flex align-items-center py-1">
              <div className="me-4">
                <div className='user-web'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Web page</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6">Callaway.com</a></p>
                </div>
                <div className='user-address'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Address</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6">{getCurrentUsers?.address}</a></p>
                </div>
                <div className='d-flex'>
                  <div>
                    <div>
                      <span className="gx-mb-0 text-white fw-semibold fs-5">Phone</span>
                      <p className='gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6'>{getCurrentUsers?.phone}</p>
                    </div>
                  </div>
                  <div className='mx-10'>
                    <div>
                      <span className="gx-mb-0 text-white fw-semibold fs-5">Phone2</span>
                      <p className='gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6'>{getCurrentUsers?.phone2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {getLoadings && <Loading />}

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

        {isOrder && <GetAllorder resetOrder={handleResetOrder} />}
      </div>
    </div>
  );
};

export default ManagerProfile;
