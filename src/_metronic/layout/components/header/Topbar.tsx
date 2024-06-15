
import {FC, useEffect,useState} from 'react'
import clsx from 'clsx'
import {KTIcon,KTSVG, toAbsoluteUrl} from '../../../helpers'
import "./Topbar.css"
import ProfileImage from "../../../../../public/media/logos/icon-profile.png"
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  QuickLinks,
  Search,
  ThemeModeSwitcher,
} from '../../../partials'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser, getUserAccount } from '../../../../app/slice/UserSlice/UserSlice'
import { UserAccountModel } from '../../../../app/modules/model/useAccount/UserAccountModel'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40p',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'fs-1'



const Topbar: FC = () => {
  const [role, setRole] = useState<string>();
  const navigate= useNavigate()
  // move to cart

  const handleCart=()=>{
    navigate("/cart")

  }

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
    
    
  const handleOrder = () => {
    if (role === "Manager" && getCurrentUsers&&getCurrentUsers.id) {
      navigate(`/profilepage/managerprofile/${getCurrentUsers.id}`)
    } else if (role === "Retailer" &&getCurrentUsers&&getCurrentUsers.id){
      navigate(`/profilepage/retailerprofile/${getCurrentUsers.id}`)
    }
    else if (role==="Admin"  && getCurrentUsers&&getCurrentUsers.id){
      navigate(`/profilepage/adminprofile/${getCurrentUsers.id}`)
    }
    else if (role==="Sales Representative"  && getCurrentUsers&&getCurrentUsers.id){
      navigate(`/profilepage/salesprofile/${getCurrentUsers.id}`)
    }

  }
  
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>
        
        <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          
        <div 
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom order-btn',
              toolbarButtonHeightClass
            )}
            onClick={handleOrder}
          >
           
         
           <i className="bi bi-bag"></i>

           
            <span className="cart-btn">My Orders</span>         
          </div>



          
          {/* begin::Menu- wrapper */}
          <div 
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom cart-button',
              toolbarButtonHeightClass
            )}
            // data-kt-menu-trigger='click'
            // data-kt-menu-attach='parent'
            // data-kt-menu-placement='bottom-end'
            // data-kt-menu-flip='bottom'
            onClick={handleCart}
          >
           
         
           <KTSVG  path="media/icons/duotune/ecommerce/ecm001.svg" className="svg-icon-muted svg-cart">
          
            </KTSVG>
           
            <span className="cart-btn"> CART</span>         
          </div>


          {/* <HeaderNotificationsMenu /> */}
          {/* end::Menu wrapper */}
        </div>

        {/* CHAT */}

        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
       
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_drawer_chat_toggle'
          >
            <KTIcon iconName='message-text-2' className={toolbarButtonIconSizeClass} />

            <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
          </div>
         
        </div> */}

        {/* Quick links */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
    
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTIcon iconName='element-11' className={toolbarButtonIconSizeClass} />
          </div>
          <QuickLinks />

        </div> */}

        {/* begin::Theme mode */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
        </div> */}
        {/* end::Theme mode */}

        {/* begin::User */}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          {/* begin::Toggle */}
          <div
            className={clsx('cursor-pointer symbol profile-img', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <img
              className='h-30px w-30px rounded '
              // src={toAbsoluteUrl('media/avatars/300-2.jpg')}
              src={ProfileImage}
              alt='metronic'
            />
          </div>
          <HeaderUserMenu />
          {/* end::Toggle */}
        </div>
        {/* end::User */}
      </div>
    </div>
  )
}

export {Topbar}
