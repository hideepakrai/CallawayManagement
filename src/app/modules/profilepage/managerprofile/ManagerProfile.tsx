import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd'; // Import Row and Col components from Ant Design

import "./ManagerProfile.css";
import PendingOrder from './PendingOrder';
import AllOrder from './AllOrders';
import { friendList } from "./FriendList";
import Friends from './Friend';
import { contactList } from './ContactsList';
import Contact from './Contact';
import {getUserAccount} from "../../../slice/UserSlice/UserSlice";

import {UserAccountModel} from "../../model/useAccount/UserAccountModel"
import { useSelector } from 'react-redux';
import Loading from '../../../modules/loading/Loading'
import {getLoading,LoadingStop,LoadingStart} from "../../../slice/loading/LoadingSlice"
import GetAllOrder from '../../../api/manager/GetAllOrders';
import { useDispatch } from 'react-redux';
import ManagerSlider from './ManagerSlider';
import GetAllorder from '../../orderPage/GetAllorder';

const ManagerProfile = () => {
  const dispatch = useDispatch();
  const getLoadings=useSelector(getLoading)
  const getUserAccounts= useSelector(getUserAccount) 

  const [userRoleId, setUseRoleId]= useState<number|null>(null)
 
  const [isOrder, setIsOrder]= useState(false);
  const [acountype, setAcountype]= useState<string>("")
  const [UserId, setUserId]= useState<number>()
  useEffect(()=>{
    if(getUserAccounts && getUserAccounts.user_id){
        setUserId(getUserAccounts.user_id);
        setIsOrder(true)
    }
},[getUserAccounts])


 
const handleResetOrder=() => {
  setIsOrder(false)

}
  
  return (
    <div>
   


<ManagerSlider/>

<div className='content-pro'>
      <div className="toolbar  pb-20 mb-3 " id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="d-flex ">
            <div className='profile-page'>
              <img src='https://via.placeholder.com/150' alt="Profile"></img>
              <span className="d-flex text-white  my-1 fs-5  profle-role">Manager</span>
            </div>
            
            
            <div className='pt-5 mx-6'>
              <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3 fw-bold"> Shashi Kiranshetty</h1>
              <a href='#'><span className="gx-mb-0 text-gray-100 fw-semibold text-hover-primary fs-4">shashi.kiranshetty@gmail.com</span></a>
              <span className="d-flex text-white  my-1 fs-7">Lorem Ipsum is simply dummy text  of the printing and <br></br> typesetting industry.</span>
      

              {/* <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3">{getUserAccountDetails?.attributes?.username} </h1>
              <h2 className="d-flex text-white fw-bold my-1 fs-3"> {getUserAccountDetails?.attributes?.role?.data?.attributes?.name}</h2> */}
            </div>
          </div>


          <div className="d-flex align-items-center py-1">
            <div className="me-4">
              <a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-white" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                
              </a>
            </div>
          </div>
        </div>
      </div>
      {getLoadings &&<Loading/>}

      <Row className='container'>
        <Col xl={18} lg={14} md={14} sm={24} xs={24} className='user-left-section'>

        <PendingOrder />
       <AllOrder   />
        </Col>

        <Col xl={6} lg={10} md={10} sm={24} xs={24} >
        <Friends friendList={friendList} />
       <Contact contactList={contactList} />
        </Col>
      </Row>

 

     {/* { userRoleId !=null &&
     <GetAllOrder
      userRoleId={userRoleId}
      resetmanagerid={handleResetId}
      />} */}

 {isOrder && UserId!=null &&
    <GetAllorder
    userId={UserId}
    resetOrder={handleResetOrder}
    />} 

 
          </div>  


    </div>
  );
};

export default ManagerProfile;
