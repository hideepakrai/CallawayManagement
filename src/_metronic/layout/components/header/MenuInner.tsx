import React, { useState, useEffect } from 'react';
import { MenuItem } from './MenuItem';
import { MenuInnerWithSub } from './MenuInnerWithSub';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../app/slice/UserSlice/UserSlice';
import { UserAccountModel } from '../../../../app/modules/model/useAccount/UserAccountModel';

export function MenuInner() {
  const intl = useIntl();
  const [role, setRole] = useState<string | undefined>();
  const currentUser = useSelector(getCurrentUser) as UserAccountModel;

  useEffect(() => {
    if (currentUser && currentUser.role) {
      setRole(currentUser.role);
    }
  }, [currentUser]);

  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />

      <MenuInnerWithSub title='Products' to='/Brand' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem icon='shield-tick' to='/brand/callaway/apparel' title='Callaway SoftGoods' />
        <MenuItem icon='shield-tick' to='/brand/callaway/goods' title='Callaway Hardgoods' />
        <MenuItem icon='shield-tick' to='/brand/ogio' title='Ogio' />
        <MenuItem icon='shield-tick' to='/brand/travis-methew' title='Travis Mathew' />
      </MenuInnerWithSub>

      {role === 'Admin' && (
        <MenuInnerWithSub title='Accounts' to='/accounts' menuPlacement='bottom-start' menuTrigger='click'>
          <MenuItem icon='profile-circle' to='/account/cway-user' title='Sales Representative' />
          <MenuItem icon='element-plus' to='/account/cway-manager' title='Manager' />
          <MenuItem icon='shield-tick' to='/account/cway-retailer' title='Retailer' />
        </MenuInnerWithSub>
      )}

      {
        role === 'Admin' &&(
          <MenuItem title='Other Accounts' to='/other-account' />
        )
      }
    </>
  );
}
