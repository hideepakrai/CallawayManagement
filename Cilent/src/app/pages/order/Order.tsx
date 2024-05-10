import React from 'react'
import OrderPage from '../../modules/orderPage/OrderPage'


export const Order = () => {
  return (
    <div>

<div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3">Order</h1>
          </div>

          {/* <div className="d-flex align-items-center py-1">
              <div className="me-4"><a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-white" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                <i className="ki-duotone ki-filter fs-5 me-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  </i>Filter</a>
                  </div>
                  <a className="btn bg-body btn-active-color-primary" id="kt_toolbar_primary_button" data-bs-theme="light">Create</a>
                  </div> */}
        </div>
      </div>

        <OrderPage/>
    </div>
  )
}
