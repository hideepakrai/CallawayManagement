import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd'; // Import Row and Col components from Ant Design

import "./ManagerProfile.css";
import PendingOrder from './PendingOrder';
import AllOrder from './AllOrders';
import { friendList } from "./FriendList";
import Friends from './Friend';
import { contactList } from './ContactsList';
import Contact from './Contact';
import { getCurrentUser, getUserAccount } from "../../../slice/UserSlice/UserSlice";

import { UserAccountModel } from "../../model/useAccount/UserAccountModel"
import { useSelector } from 'react-redux';
import Loading from '../../../modules/loading/Loading'
import { getLoading, LoadingStop, LoadingStart } from "../../../slice/loading/LoadingSlice"
import GetAllOrder from '../../../api/manager/GetAllOrders';
import { useDispatch } from 'react-redux';
import ManagerSlider from './ManagerSlider';
import GetAllorder from '../../orderPage/GetAllorder';
import profilelogo from "../../../../../public/media/logos/favicon-icon.png"
import AllPendingOrder from './AllPendingOrder';
import { CurentUser } from '../../model/useAccount/CurrentUser';
const ManagerProfile = () => {
  const dispatch = useDispatch();
  const getLoadings = useSelector(getLoading)
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser

  const [userRoleId, setUseRoleId] = useState<number | null>(null)

  const [isOrder, setIsOrder] = useState(false);
  const [acountype, setAcountype] = useState<string>("")
  const [UserId, setUserId] = useState<number>()
  useEffect(() => {
    if (getCurrentUsers && getCurrentUsers.id) {
      
      setIsOrder(true)
    }
  }, [])



  const handleResetOrder = () => {
    setIsOrder(false)

  }

  return (
    <div>



      <ManagerSlider />

      <div className='content-pro'>
        <div className="toolbar  pb-20 mb-3 " id="kt_toolbar">
          <div id="kt_toolbar_container" className="container d-flex flex-stack">
            <div className="d-flex ">
              <div className='profile-page'>
                <img style={{ backgroundColor: "#ddd", }} src={profilelogo} alt="Profile"></img>
                <span className="d-flex text-white  my-1 fs-5  profle-role">Manager </span>
              </div>


              <div className='pt-3 mx-6'>
                <h1 className="d-flex text-white fw-light my-1 fs-1 pb-2 fw-bold"> {getCurrentUsers?.name}</h1>
                <a href='#'><span className="gx-mb-0  fw-semibold text-hover-secondary  text-gray-400 fs-4">{getCurrentUsers?.email} <i className="bi bi-copy text-gray-400 text-hover-secondary cursor-pointer"></i></span></a>
                {/* <span className="d-flex text-white  my-1 fs-7">Lorem Ipsum is simply dummy text  of the printing and <br></br> typesetting industry.</span> */}
                {/* <div className='pt-2'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">GSTIN</span>

                  <p className='gx-mb-0 text-gray-400 fw-bold  text-hover-secondary fs-5 '>22AAAAA0000A1Z5  <i className="bi bi-copy text-gray-400 text-hover-secondary cursor-pointer"></i></p>

                </div> */}


                {/* <h1 className="d-flex text-white fw-light my-1 fs-1 pb-3">{getUserAccountDetails?.attributes?.username} </h1>
              <h2 className="d-flex text-white fw-bold my-1 fs-3"> {getUserAccountDetails?.attributes?.role?.data?.attributes?.name}</h2> */}
              </div>
            </div>


            <div className="d-flex align-items-center py-1">

              <div className="me-4 ">
                {/* <a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-white" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
sa
                </a> */}
                <div className='user-web'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Web page</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6"> Callaway.com</a></p>
                </div>

                <div className='user-address'>
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Address</span>
                  <p><a href="#" className="gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6"> {getCurrentUsers?.address}</a></p>
                </div>

<div className='d-flex'>
                <div>


                  <div>
                    <span className="gx-mb-0 text-white fw-semibold fs-5">Phone</span>

                    <p className='gx-mb-0 text-gray-400 fw-bold  text-hover-secondary fs-6'>{getCurrentUsers?.phone}</p>
                  </div>

                  {/* <div>
                    <span className="gx-mb-0 text-white fw-semibold fs-5">City</span>
                    <p className='gx-mb-0 text-gray-400 fw-bold text-hover-secondary fs-6'> Jaipur</p>
                  </div> */}
                </div>

                <div className='mx-10'>



                <div>
                    <span className="gx-mb-0 text-white fw-semibold fs-5">Phone2</span>

                    <p className='gx-mb-0 text-gray-400 fw-bold  text-hover-secondary fs-6'>{getCurrentUsers?.phone2}</p>
                  </div>



                  {/* <div>
                    <span className="gx-mb-0 text-white fw-semibold fs-5">Phone</span>

                    <p className='gx-mb-0 text-gray-400 text-hover-secondary fw-bold fs-6'>9891188566</p>
                  </div> */}

                </div>
                </div>




              </div>
            </div>
          </div>
        </div>
        {getLoadings && <Loading />}

        <Row className='container'>

          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>
        
          <AllPendingOrder />
            {/* <PendingOrder /> */}

          </Col>


          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>
          <AllOrder />
            {/* <PendingOrder />  */}
           
          </Col>


          <Col xl={24} lg={18} md={14} sm={24} xs={24} className='user-left-section'>

           
            <Friends friendList={friendList} />
          </Col>



          {/* <Col xl={6} lg={10} md={10} sm={24} xs={24} >
            <Contact contactList={contactList} />
          </Col> */}

        </Row>



        {/* { userRoleId !=null &&
     <GetAllOrder
      userRoleId={userRoleId}
      resetmanagerid={handleResetId}
      />} */}

        {isOrder && 
          <GetAllorder
           
            resetOrder={handleResetOrder}
          />}


      </div>


    </div>
  );
};

export default ManagerProfile;
