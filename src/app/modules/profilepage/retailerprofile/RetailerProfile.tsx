import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd'; // Import Row and Col components from Ant Design

import "./RetailerProfile.css";
import PendingOrder from './PendingOrder';
import AllOrders from './AllOrders';
import { friendList } from "./FriendList";
import Friends from './Friend';
import { contactList } from './ContactList';
import Contact from './Contact';
import {getUserAccount} from "../../../slice/UserSlice/UserSlice";
import {UserAccountModel} from "../../model/useAccount/UserAccountModel"
import { useDispatch , useSelector} from 'react-redux';
import Loading from '../../../modules/loading/Loading';
import {getLoading,LoadingStop,LoadingStart} from "../../../slice/loading/LoadingSlice"
import GetAllOrdersRetailer from '../../../api/retailers/GetAllOrdersRetlr';
const RetailerProfile = () => {

  const dispatch = useDispatch();
  const getLoadings=useSelector(getLoading)
  const getUserAccountDetails= useSelector(getUserAccount) as UserAccountModel;
  console.log("getUserAccount",getUserAccountDetails)
  const [userRoleId, setUseRoleId]= useState<number|null>(null)
  const [userid, setUserId]= useState<number|null>(null)

  useEffect(()=>{
    if(getUserAccountDetails &&
      getUserAccountDetails.id
    ){
      setUserId(getUserAccountDetails.id)
      setUseRoleId(getUserAccountDetails.id)
      dispatch(LoadingStart())
    }
  },[getUserAccountDetails])

  const handleResetId=()=>{
    setUseRoleId(null)
    dispatch(LoadingStop())
  }
  return (
    <div>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="d-flex ">
            <div className='profile-page'>
              <img src='https://via.placeholder.com/150' alt="Profile"></img>
            </div>
            <div className='pt-5 mx-6'>
              <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3">Manish Gupta </h1>
              <h2 className="d-flex text-white fw-bold my-1 fs-3"> Retailer</h2>
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

      {getLoadings &&<Loading/>}

      
      <Row className='container'>
        <Col xl={16} lg={14} md={14} sm={24} xs={24} className='user-left-section'>
        <PendingOrder />
      <AllOrders   />
        </Col>

        <Col xl={8} lg={10} md={10} sm={24} xs={24} >
        <Friends friendList={friendList} />
       <Contact contactList={contactList} />
        </Col>
      </Row>

      { userRoleId !=null &&
      <GetAllOrdersRetailer
      userRoleId={userRoleId}
      resetmanagerid={handleResetId}
      />}
    </div>
  );
};

export default RetailerProfile;
