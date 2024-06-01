import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Button, Tooltip } from 'antd';
import { getUserProfile } from '../../../slice/UserSlice/UserSlice';
import { getRetailers } from '../../../slice/retailer/RetailerSlice';
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import { KTIcon } from '../../../../_metronic/helpers';
import "./UserList.css";

const UserList = () => {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const allRetailers = useSelector(getUserProfile); // Assuming this selector returns the retailers, update if needed

  useEffect(() => {
    // dispatch(getRetailers());
  }, [dispatch]);

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
    <div className='card-body py-3'>
      <div className='table-responsive'>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
          <thead>
            <tr className='fw-bold text-muted'>
              <th className='w-25px'>
                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value='1'
                    data-kt-check='true'
                    data-kt-check-target='.widget-9-check'
                  />
                </div>
              </th>
              <th className='min-w-100px'>Name</th>
              <th className='min-w-100px'>Email</th>
              <th className='min-w-100px'>Phone</th>
              <th className='min-w-100px'>GSTIN</th>
              <th className='min-w-100px'>Address</th>
            </tr>
          </thead>
          <tbody>
            {allRetailers && allRetailers.length > 0 && allRetailers.map((item: RetailerModel) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center ' style={{ width: '250px' }}>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-7'>
                          {item.name}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={{ width: '180px' }}>
                    <span style={{ width: '250px' }} className='text-gray-900 fw-bold d-block fs-6'>
                      {item.email ?? ''}
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <i
                          className={`bi ${copied ? 'bi-copy' : 'bi-copy'} mx-2 cursor-pointer text-gray-500 text-hover-dark`}
                          onClick={() => item.email && copyToClipboard(item.email)}
                        ></i>
                      </Tooltip>
                    </span>
                  </td>

                  <td style={{ width: '220px' }}>
                    <span className='text-gray-900 fw-bold d-block fs-6'>
                      {item.phone}
                    </span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                  </td>

                  <td style={{ width: '220px' }}>
                    <span className='text-gray-900 fw-bold d-block fs-6'>
                      {item.gstin ?? ''}
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <i
                          className={`bi ${copied ? 'bi-copy' : 'bi-copy'} mx-2 cursor-pointer text-gray-500 text-hover-dark`}
                          onClick={() => item.gstin && copyToClipboard(item.gstin)}
                        ></i>
                      </Tooltip>
                    </span>
                  </td>

                  <td style={{ width: '320px' }}>
                    <span className='text-gray-900 fw-bold d-block fs-7'>
                      {item.address}
                    </span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
