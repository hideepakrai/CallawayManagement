import React, { useEffect, useState } from 'react';
import { Row, Col,Tabs } from 'antd'; // Import Row and Col components from Ant Design

import "./RetailerProfile.css";
import PendingOrder from '../managerprofile/AllPendingOrder';
import AllOrders from '../managerprofile/AllOrders';
import { friendList } from "./FriendList";
import Friends from './Friend';
import { Badge, Button, Tooltip } from 'antd';
import { contactList } from './ContactList';
import Contact from './Contact';
import { getCurrentUser, getUserAccount } from "../../../slice/UserSlice/UserSlice";
import { UserAccountModel } from "../../model/useAccount/UserAccountModel"
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../modules/loading/Loading';
import { getLoading, LoadingStop, LoadingStart } from "../../../slice/loading/LoadingSlice"
import GetAllOrdersRetailer from '../../../api/retailers/GetAllOrdersRetlr';
import GetAllorder from '../../orderPage/GetAllorder';
import profilelogo from "../../../../../public/media/logos/favicon-icon.png"
import ManagerSlider from '../managerprofile/ManagerSlider';
import { Card } from 'react-bootstrap';
const RetailerProfile = () => {
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  const getLoadings = useSelector(getLoading)
  const getCurrentUsers = useSelector(getCurrentUser)

  const [userRoleId, setUseRoleId] = useState<number | null>(null)
  const [userid, setUserId] = useState<number | null>(null)
  const [isOrder, setIsOrder] = useState(false);
  useEffect(() => {
    if (getCurrentUsers && getCurrentUsers.id) {

      setIsOrder(true)
    }
  }, [])

  const handleResetOrder = () => {
    setIsOrder(false)
    dispatch(LoadingStop())
  }

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
      children: <PendingOrder />,
    },
    {
      key: '2',
      label: 'Completed Orders',
      children: <AllOrders />,
    },
    {
      key: '3',
      label: 'Users',
      children: <Friends friendList={friendList} />,
    },
  ];
  

  return (
    <div>
      <ManagerSlider />

      <div className='content-pro '>
        <div className="toolbar pb-16 mb-0" id="kt_toolbar">
          <div id="kt_toolbar_container " className="container d-flex flex-stack">
            <div className="d-flex ">
              <div className='profile-page'>
                <img style={{ backgroundColor: "#ddd", }} src={profilelogo} alt="Profile"></img>
                <span className="d-flex text-white  my-1 fs-5  profle-role">Retailer </span>
              </div>
              <div className='pt-3 mx-6'>

                <h1 className="d-flex text-white fw-light my-1 fs-1 pb-2 fw-bold"> {getCurrentUsers?.name}</h1>
                {/* <h2 className="d-flex text-white fw-bold my-1 fs-3"> Retailer</h2> */}

                <a href='#'><span className="gx-mb-0  fw-semibold text-hover-secondary  text-gray-400 fs-4">
                  {getCurrentUsers?.email}

                  <Tooltip title={copied ? 'Copied!' : 'Copy'} overlayInnerStyle={{ backgroundColor: 'white', color: 'black' }}>
                    <i
                      className={`bi ${copied ? 'bi-copy' : 'bi-copy'} mx-2 cursor-pointer text-gray-500 text-hover-dark`}
                      onClick={() => getCurrentUsers?.name && copyToClipboard(getCurrentUsers?.name)}
                    ></i>
                  </Tooltip>

                </span>
                </a>

              </div>

            </div>


            <div className="d-flex align-items-center py-1">

              <div className="me-4 ">
                <div className='user-web'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Web page</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6"> Callaway.com</a></p>
                </div>

                <div className='user-address'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Address</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary  fs-6"> {getCurrentUsers?.address}</a></p>
                </div>

                <div className='d-flex'>
                  <div>
                    <span className="gx-mb-0 text-white fw-semibold fs-5">Phone</span>
                    <p className='gx-mb-0 text-gray-400 fw-bold  text-hover-secondary fs-6'> {getCurrentUsers?.phone}</p>
                  </div>


                  <div className='mx-10'>

                    <span className="gx-mb-0 text-white fw-semibold fs-5">Phone2</span>
                    <p className='gx-mb-0 text-gray-400 fw-bold  text-hover-secondary fs-6'>{getCurrentUsers?.phone2}</p>
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
        </Row>

        {/* <Row className='container'>
          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>
            <PendingOrder />
          </Col>


          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>
            <AllOrders />


          </Col>

          <Col xl={24} lg={18} md={14} sm={24} xs={24} className='user-left-section'>

            <Friends friendList={friendList} />

          </Col>
        </Row> */}



        {isOrder &&
          <GetAllorder
            resetOrder={handleResetOrder}
          />}




      </div>
    </div>
  );
};

export default RetailerProfile;
