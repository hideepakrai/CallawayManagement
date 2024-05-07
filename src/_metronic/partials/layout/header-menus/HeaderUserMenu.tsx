import React, {useState, useEffect} from 'react'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import { useDispatch } from 'react-redux'
import {resetTravisProduct} from "../../../../app/slice/allProducts/TravisMethewSlice"
import {resetOrder} from "../../../../app/slice/orderSlice/travis/CartOrder"
import { useSelector } from 'react-redux'
import {resetCallayGoods} from "../../../../app/slice/allProducts/CallAwayGoodsSlice"
import {getUserAccount,resetUserAccount} from "../../../../app/slice/UserSlice/UserSlice"
import { UserAccountModel } from '../../../../app/modules/model/useAccount/UserAccountModel'
import { useNavigate } from 'react-router-dom'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth();
  const [role, setRole]= useState<string>();
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const handleLogout=()=>{
    
    dispatch(resetOrder())
    dispatch(resetCallayGoods())
  

    dispatch(resetUserAccount())
    deleteLocalStorage()
    logout()

  }


  const deleteLocalStorage=()=>{
    localStorage.removeItem('getCurrentUsers')
    localStorage.removeItem('getUserAccounts')
    localStorage.removeItem('getOtherProduct')
    localStorage.removeItem('getTravisProduct')
    localStorage.removeItem('getOgioProduct')
    localStorage.removeItem('getCategorys')
  
    localStorage.removeItem('getStyleCodes')
  }
// set the role

  const getUserAccounts= useSelector(getUserAccount) as UserAccountModel;
  useEffect(() => {
    if(getUserAccounts && 
      getUserAccounts?.attributes &&
    getUserAccounts?.attributes.role &&
    getUserAccounts?.attributes?.role?.data &&
    getUserAccounts?.attributes?.role?.data?.attributes &&
    getUserAccounts?.attributes?.role?.data?.attributes?.name){
      setRole(getUserAccounts?.attributes?.role?.data?.attributes?.name)
    }
  }
  , [getUserAccounts])
  // console.log(getUserAccounts)
  const handleProfile=()=>{
    if(role==="manager"){
  navigate("/profilepage/managerprofile")
    } else if (role==="retailer"){
      navigate("/profilepage/retailerprofile")
    }

  }


  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-semibold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('media/avatars/300-2.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bold d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.last_name}
              <span className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-semibold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      {/* <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          My Profile
        </Link>
      </div> */}

      <div className='menu-item px-5' >
        <a href='#' className='menu-link px-5'
        onClick={handleProfile}
        >
          <span className='menu-text'>My Profile</span>
          {/* <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bold fs-7'>3</span>
          </span> */}
        </a>
      </div>

      {/* <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>My Subscription</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Referrals
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Billing
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Payments
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link d-flex flex-stack px-5'>
              Statements
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='View your statements'
              ></i>
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                <span className='form-check-label text-muted fs-7'>Notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          My Statements
        </a>
      </div> */}

      <div className='separator my-2'></div>

      <Languages />

      {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <a onClick={handleLogout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
