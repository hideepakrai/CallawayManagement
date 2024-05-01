import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {Order} from "../pages/order/Order.js"
import Ogio from "../pages/brand/ogio/Ogio.js"
import RetailerProfile from '../pages/profilepage/retailerprofile/RetailerProfile.js'
import ManagerProfile from '../pages/profilepage/managerprofile.tsx/ManagerProfile.js'
import SalesProfile from '../pages/profilepage/salesprofile/SalesProfile.js'
import SalesRepresentative from '../pages/accountpage/salesrepresentative/SalesRepresentative.js'
import Retailer from '../pages/accountpage/retailer/Retailer.js'
import Manager from '../pages/accountpage/manager/Manager.js'
import CallawayApparel from '../pages/brand/callaway/CallawayApparel.js'

import TravisMathew from '../pages/brand/travisMathew/TravisMathew.js'
import CallAwayGoods from "../pages/brand/callaway/CallawayGoods.js"

import Cart from '../pages/cart/Cart.js'
const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='order' element={<Order />} />

        <Route path='/profilepage/retailerprofile' element={<RetailerProfile />} />
        <Route path='/profilepage/managerprofile' element={<ManagerProfile />} />
        <Route path='/profilepage/salesprofile' element={<SalesProfile />} />

        <Route path='/account/cway-user' element={<SalesRepresentative />} />
        <Route path='/account/cway-manager' element={<Manager />} />
        <Route path='/account/cway-retailer' element={<Retailer />} />



         {/* brand routes */}
         <Route path='/brand/ogio' element={<Ogio />} />
         <Route path='/brand/travis-methew' element={<TravisMathew />} />
         <Route path='/brand/callaway/goods' element={<CallAwayGoods />} /> 
         <Route path='/brand/callaway/apparel' element={<CallawayApparel />} /> 
        {/* Lazy Modules */}


      {/* cart page */}

      <Route path='/cart' element={<Cart />} />
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
