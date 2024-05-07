import React from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
type Props = {
    className: string
  }

  
const RetailsTable = () => {
  return (
    <div className='container '>
        <div className="card" >
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Retailer</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>All Retailer</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTIcon iconName='plus' className='fs-3' />
            New Retailer
          </a>
        </div>
      </div>
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
                <th className='min-w-150px'>Phone </th>
                <th className='min-w-140px'>City</th>
                <th className='min-w-120px'>Orders</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}


            <tbody>
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
                      Stella Johnson
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      stella.johnson@example.co
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
                 
                  <span className='text-muted me-2 fs-6 fw-semibold'>Jaipur</span>
                 
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>CEO</span>
                    </div>
                    {/* <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{width: '50%'}}
                      ></div>
                    </div> */}
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


              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-6.jpg" alt='' /> 
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                     Deepak Rai
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      deepakrai@example.com
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
                {/* <span  className='text-muted fw-bold text-hover-primary d-block fs-6'>
                    CFO
                  </span> */}
                  <span className='text-muted me-2 fs-6 fw-semibold'>Ajmer</span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>CFO</span>
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
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-1.jpg" alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      Manish Gupta
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      manishgupta@example.com
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
                    RoadGee
                  </span>
               
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>Manager</span>
                    </div>
                    {/* <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-success'
                        role='progressbar'
                        style={{width: '60%'}}
                      ></div>
                    </div> */}
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
              <tr>
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
              </tr>


              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-20.jpg" alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      Sonu Gupta
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      sonugupta@example.com
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
                      <span className='text-muted me-2 fs-7 fw-semibold'>Market</span>
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



              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src="/public/media/avatars/300-17.jpg" alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      Manish Sharma
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                     ManishSharma@example.com
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
                 Ajmer
                  </span>
                 
                </td>


                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>HR Manager</span>
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
  )
}

export default RetailsTable
