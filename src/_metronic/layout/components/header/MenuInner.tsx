import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'
import { Button } from 'react-bootstrap'

export function MenuInner() {
  const intl = useIntl()


  const handleCart=()=>{
    console.log('cart')
  }
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      {/* <MenuItem title='Layout Builder' to='/builder' /> */}
     {/* order page */}
      {/* <MenuItem title='Order' to='/order' /> */}

        {/* Brand */}

        <MenuInnerWithSub title='Products' to='/Brand' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        {/* <MenuInnerWithSub
          title='Callaway'
          to='/brand/callaway'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/brand/callaway/apparel' title='Callaway Apparel' hasBullet={true} />
          <MenuItem to='/brand/callaway/goods' title='Callaway Hardgoods' hasBullet={true} />

          <MenuItem to='/brand/callaway/odyssey' title='Odyssey' hasBullet={true} />
        </MenuInnerWithSub> */}
      
        <MenuItem icon='message-text-2' to='/brand/callaway/apparel' title='Callaway Apparel' />

          <MenuItem icon='shield-tick' to='/brand/callaway/goods' title='Callaway Hardgoods' />
        <MenuItem icon='message-text-2' to='/brand/ogio' title='Ogio' />
        <MenuItem icon='shield-tick' to='/brand/travis-methew' title='Travis Mathew' />
      </MenuInnerWithSub>




{/* profile */}
      {/* <MenuInnerWithSub title='Profile' to='/ProfilePage' menuPlacement='bottom-start' menuTrigger='click'>
       
       
        <MenuItem icon='profile-circle' to='/profilepage/retailerprofile' title='Retailer Profile' />
        <MenuItem icon='element-plus' to='/profilepage/managerprofile' title='Manager Profile' />
        <MenuItem icon='shield-tick' to='/profilepage/salesprofile' title='Sales Profile' />
      </MenuInnerWithSub> */}

{/* profile end */}

<MenuInnerWithSub title='Accounts' to='/accounts' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
       
        <MenuItem icon='profile-circle' to='/account/cway-user' title='Sales Representative' />
        <MenuItem icon='element-plus' to='/account/cway-manager' title='Manager' />
        <MenuItem icon='shield-tick' to='/account/cway-retailer' title='Retailer' />
      </MenuInnerWithSub>



      {/* <MenuInnerWithSub
        title='Crafted'
        to='/crafted'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        
        <MenuInnerWithSub
          title='Pages'
          to='/crafted/pages'
          icon='element-plus'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title='Profile'
            to='/crafted/pages/profile'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
            <MenuItem
              to='/crafted/pages/profile/connections'
              title='Connections'
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title='Wizards'
            to='/crafted/pages/wizards'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
            <MenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
          </MenuInnerWithSub>
        </MenuInnerWithSub>

        
        <MenuInnerWithSub
          title='Accounts'
          to='/crafted/accounts'
          icon='profile-circle'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
          <MenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
        </MenuInnerWithSub>

      
        <MenuInnerWithSub
          title='Errors'
          to='/error'
          icon='fingerprint-scanning'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/error/404' title='Error 404' hasBullet={true} />
          <MenuItem to='/error/500' title='Error 500' hasBullet={true} />
        </MenuInnerWithSub>

       
        <MenuInnerWithSub
          title='Widgets'
          to='/crafted/widgets'
          icon='element-11'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
          <MenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
          <MenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
          <MenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
          <MenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
          <MenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
       
        <MenuInnerWithSub
          title='Chat'
          to='/apps/chat'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
          <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuItem icon='shield-tick' to='/apps/user-management/users' title='User management' />
      </MenuInnerWithSub>
      <MenuInnerWithSub
        isMega={true}
        title='Mega menu'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />

      </MenuInnerWithSub> */}
      
    </>
  )
}
