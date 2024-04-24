import React from 'react';
import { Row, Col } from 'antd'; // Import Row and Col components from Ant Design

import PendingOrder from './PendingOrder';
import AllOrders from './AllOrders';
import Contact from './Contact';
import { contactLists } from './ContactList';
import Friends from './Friend';
import { friendList } from './FriendList';

const SalesProfile = () => {
  return (
    <div>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="d-flex ">
            <div className='profile-page'>
              <img src='https://via.placeholder.com/150' alt="Profile"></img>
            </div>
            <div className='pt-5 mx-6'>
              <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3">Rahul Sharma</h1>
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

      <Row className='cw-container'>
        <Col xl={16} lg={14} md={14} sm={24} xs={24} className='user-left-section'>
        
          <PendingOrder/>
<AllOrders/>
        </Col>

        <Col xl={8} lg={10} md={10} sm={24} xs={24}>
        <Friends friendList={friendList} /> 
        <Contact contactList={contactLists} />

        </Col>
      </Row>

    </div>
  );
};

export default SalesProfile;
