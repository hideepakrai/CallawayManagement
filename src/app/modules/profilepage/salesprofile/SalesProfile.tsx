import React, {useState, useEffect} from 'react';
import { Row, Col, Card, Tabs,Tooltip } from 'antd'; // Import Row and Col components from Ant Design

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
import Friends from '../salesprofile/Friend';
import Slider from '../../profilepage/managerprofile/ManagerSlider'
import profilelogo from "../../../../../public/media/logos/favicon-icon.png"
import "./SalesProfile.css";
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
      label: 'Users',
      children:  <Friends />,
    },
  ];


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


  return (

    <>
    <Slider/>

    <div className='content-pro'>
      <div className="toolbar pb-20 mb-3" id="kt_toolbar">

        <div id="kt_toolbar_container" className="container d-flex flex-stack">

          <div className="d-flex ">
         <div className='profile-page'>
                <img style={{ backgroundColor: "#ddd", }} src={profilelogo} alt="Profile"></img>
                <span className="d-flex text-white  my-1 fs-5  profle-role">Sales Rep </span>
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




<Row className='container'>

          <Col xl={24} lg={24} md={14} sm={24} xs={24} className='user-left-section  table-orders'>
            <Card className='salesrep-profile-section'>
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
    </>
    
  );
};

export default SalesProfile;
