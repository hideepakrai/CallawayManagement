import React, { useEffect, useState } from 'react'

import profilelogo from "../../../../../public/media/logos/favicon-icon.png"
import { getCurrentUser } from '../../../slice/UserSlice/UserSlice'
import { useSelector } from 'react-redux'
import { CurentUser } from '../../model/useAccount/CurrentUser'
import Loading from '../../loading/Loading'
import { LoadingStop, getLoading } from '../../../slice/loading/LoadingSlice'
import { Row, Col, Tabs } from 'antd'; // Import Row and Col components from Ant Design
import ManagerSlider from "../managerprofile/ManagerSlider"

import GetAllorder from '../../orderPage/GetAllorder'
import AllPendingOrder from '../managerprofile/AllPendingOrder'
import AllOrders from '../managerprofile/AllOrders'
import ManagerPofile from "../managerprofile/Friend"
import { useDispatch } from "react-redux"
import { Badge, Button, Tooltip } from 'antd';
import { Card } from 'react-bootstrap';
import Support from './Support'


const AdminHome = () => {
  const [copied, setCopied] = useState(false);
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  const getLoadings = useSelector(getLoading);
  const [isOrder, setIsOrder] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    
    if (getCurrentUsers && getCurrentUsers.id) {

      setIsOrder(true)
    }
  }, [])

  const handleResetOrder = () => {
    dispatch(LoadingStop())
    setIsOrder(false)

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
      children: <AllPendingOrder />,
    },

    {
      key: '2',
      label: 'Completed Orders',
      children: <AllOrders />,
    },
    {
      key: '3',
      label: 'Users',
      children:  <Support/> ,
    },
  ];



  return (
    <>
      <ManagerSlider />
      <div className='content-pro'>
        <div className="toolbar pb-20 mb-3 " id="kt_toolbar">
          <div id="kt_toolbar_container" className="container d-flex flex-stack">
            <div className="d-flex ">
              <div className='profile-page'>
                <img style={{ backgroundColor: "#ddd", }} src={profilelogo} alt="Profile"></img>
                <span className="d-flex text-white  my-1 fs-5  profle-role">Manager </span>
              </div>




              <div className='pt-3 mx-6'>
                <h1 className="d-flex text-white fw-light my-1 fs-1 pb-2 fw-bold"> {getCurrentUsers?.name}</h1>
                <a href='#'><span className="gx-mb-0  fw-semibold text-hover-secondary  text-gray-400 fs-4">{getCurrentUsers?.email}


                  <Tooltip title={copied ? 'Copied!' : 'Copy'} overlayInnerStyle={{ backgroundColor: 'white', color: 'black' }}>
                    <i
                      className={`bi ${copied ? 'bi-copy' : 'bi-copy'} mx-2 cursor-pointer text-gray-500 text-hover-dark`}
                      onClick={() => getCurrentUsers?.email && copyToClipboard(getCurrentUsers?.email)}
                    ></i>
                  </Tooltip>

                </span>
                </a>
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
                  <span className="gx-mb-0 text-white fw-semibold fs-5">Web page </span>
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

<Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section  table-orders'>
  <Card className=''>
  <Tabs defaultActiveKey="1" items={items} />
  </Card>
</Col>
</Row>

        {/* <Row className='container'>

          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>

            <AllPendingOrder />


          </Col>


          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section'>
            <AllOrders />


          </Col>


          <Col xl={24} lg={18} md={14} sm={24} xs={24} className='user-left-section'>


              <ManagerPofile/>  
          </Col>



          {/* <Col xl={6} lg={10} md={10} sm={24} xs={24} >
            <Contact contactList={contactList} />
          </Col> */}

        {/* </Row>  */}





        {isOrder &&
          <GetAllorder
            resetOrder={handleResetOrder}
          />}

        {<Loading />}

      </div>
    </>
  )
}

export default AdminHome