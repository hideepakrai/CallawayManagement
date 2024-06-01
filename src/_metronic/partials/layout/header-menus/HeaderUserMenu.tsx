import React, { useState, useEffect } from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import { Languages } from './Languages'
import { toAbsoluteUrl } from '../../../helpers'
import { useDispatch } from 'react-redux'
import { resetTravisProduct } from "../../../../app/slice/allProducts/TravisMethewSlice"
import { resetOrder } from "../../../../app/slice/orderSlice/travis/CartOrder"
import { useSelector } from 'react-redux'
import { resetCallayGoods } from "../../../../app/slice/allProducts/CallAwayGoodsSlice"
import { getUserAccount, resetUserAccount, getCurrentUser } from "../../../../app/slice/UserSlice/UserSlice"
import { UserAccountModel } from '../../../../app/modules/model/useAccount/UserAccountModel'
import { useNavigate } from 'react-router-dom'
import { resetOgio } from '../../../../app/slice/allProducts/OgioSlice'
import { resetOgioOrder } from '../../../../app/slice/orderSlice/ogio/OgioCartOrderSlice'
import ProfileImage from "../../../../../public/media/logos/favicon-icon.png";
import { resetLoading } from '../../../../app/slice/loading/LoadingSlice'
import "./HeaderUserMenu.css"
const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  const [role, setRole] = useState<string>();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(resetTravisProduct())
    dispatch(resetOgio())
    dispatch(resetOrder())
    dispatch(resetCallayGoods())
    dispatch(resetOgioOrder())
    dispatch(resetOgio())
    dispatch(resetUserAccount())
    deleteLocalStorage()
    logout()
    dispatch(resetLoading())
  }


  const deleteLocalStorage = () => {
    localStorage.removeItem('getCurrentUsers')
    localStorage.removeItem('getUserAccounts')
    localStorage.removeItem('getOtherProduct')
    localStorage.removeItem('getTravisProduct')
    localStorage.removeItem('getOgioProduct')
    localStorage.removeItem('getCategorys')

    localStorage.removeItem('getStyleCodes')
  }
  // set the role

  const getUserAccounts = useSelector(getUserAccount) as UserAccountModel;
  const getCurrentUsers = useSelector(getCurrentUser) as UserAccountModel;
  useEffect(() => {
    if (getCurrentUsers &&
      getCurrentUsers &&
      getCurrentUsers?.role) {
      setRole(getCurrentUsers?.role)
    }
  }
    , [getCurrentUsers])
  const handleProfile = () => {
    if (role === "Manager" && getCurrentUsers&&getCurrentUsers.id) {
      navigate(`/profilepage/managerprofile/${getCurrentUsers.id}`)
    } else if (role === "Retailer" &&getCurrentUsers&&getCurrentUsers.id){
      navigate(`/profilepage/retailerprofile/${getCurrentUsers.id}`)
    }
    else if (role==="Admin"  && getCurrentUsers&&getCurrentUsers.id){
      navigate(`/profilepage/adminprofile/${getCurrentUsers.id}`)
    }

  }

  return (
    <div
      className='menu dropdown-user menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-semibold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5 user-profile-img bg-secondary'>
            <img alt='Logo' src={ProfileImage} />
          </div>

          <div className='d-flex flex-column'>

            <div className='fw-bold d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.last_name}

              <span className='badge badge-light fw-bold fs-8 px-1 py-1 ms-2'>{getCurrentUsers?.role}</span>
            </div>

            <a href='#' className='fw-semibold text-white text-hover-muted fs-6 pt-2' style={{ paddingLeft: "7px" }}
              onClick={handleProfile}
            >
              {getCurrentUsers?.name}

            </a>
          </div>
        </div>
        {/* <div style={{width:"150px"}}>
           <h4  className='fw-semibold text-muted text-hover-dark fs-6 pt-2 px-3   cursor-pointer  '>
              {getCurrentUsers.email} 
            </h4>
            </div> */}
      </div>



      <div className='separator my-2'></div>



      <div className='menu-item px-5' >
        <a href='#' className='menu-link menu-lists px-5 '
          onClick={handleProfile}
        >
          <span className='menu-text user-profile-link' >My Orders</span>
        </a>
      </div>


      <div className='separator my-2'></div>



      <div className='menu-item px-5'>
        <a onClick={handleLogout} className='menu-link menu-lists px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
