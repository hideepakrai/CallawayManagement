import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import ImportRetailerModal from "./importRetailer/ImportRetailerModal";
import {useSelector, useDispatch} from "react-redux"
import Retailerheader from './Retailerheader';
//import {getRetailers} from "../../../slice/retailer/RetailerSlice"
import {RetailerModel} from "../../model/AccountType/retailer/RetailerModel"
import { getRetailers } from '../../../slice/retailer/RetailerSlice';

type Props = {
    className: string
  }

  
const RetailsTable = () => {

  const dispatch = useDispatch();
  const getRetailer= useSelector(getRetailers)
  const [allRetailers, setRetailers] = useState<RetailerModel[]>([])
    
  useEffect(()=>{
 if(getRetailer){
      // console.log("Retailer",getRetailer)
      setRetailers(getRetailer)
    }
  },[getRetailer])

  return (
    <>
    <div className='container '>
        <div className="card" >
      {/* begin::Header */}
        <Retailerheader/>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
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
                <th className='min-w-150px'>Name</th>
                <th className='min-w-150px'>Address </th>

                <th className='min-w-120px'>GSTIN</th>
                <th className='min-w-120px'>Manager Name</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}


            <tbody>
             {allRetailers &&
            allRetailers.length>0&&
            allRetailers.map((item:RetailerModel)=>{

              return(
<tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-2.jpg" alt='' /> 
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      {item.name}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      {item.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                    
                <span  className='text-gray-900 fw-bold  fs-6'>
                {item.address}
                      </span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      
                      </span>
                
                </td>

                <td>
                 
                  <span className='text-muted me-2 fs-6 fw-semibold'> {item.gstin}</span>
                 
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'> {item.manager_name}</span>
                    </div>
                   
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                  
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='trash' className='fs-3' />
                    </a>
                  </div>
                </td>
              </tr>
              )
            })  } 


             
              {/* <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-5.jpg" alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      Mukesh
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      Mukesh@example.com
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                <span  className='text-gray-900 fw-bold  fs-6'>
                     Pratap Nagar,Jaipur 
                      </span>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      +1-215-659-7529
                      </span>
                
                
                </td>

                <td>
                  <span  className='text-muted fw-bold text-hover-primary d-block fs-6'>
                  Jaipur
                  </span>
                
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>PHP Developer</span>
                    </div>
                   
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='trash' className='fs-3' />
                    </a>
                  </div>
                </td>
              </tr> */}




            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
    </div>

    
    </>
    
  )
}

export default RetailsTable
