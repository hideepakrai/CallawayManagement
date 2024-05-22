
import { FC } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
type Props = {
  className: string
  items?: number
}

const ListsWidget4: FC<Props> = ({items = 6}) => {
  return (
    <div className='card card-xl-stretch mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-900'>Products</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>All Products</span>
        </h3>
       
      </div>
      {/* end::Header */}
      {/* begin::Body */}

      <div className='card-body pt-5'>
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Symbol */}
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label'>
              <img
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/icon_callway_f25555115b.png"
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>
          {/* end::Symbol */}
          {/* begin::Section */}

          <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
            <div className='flex-grow-1 me-2'>
           
              <Link className ={ clsx ('text-gray-800 text-hover-primary fs-6 fw-bold')} to={"/brand/callaway/apparel"} > 
               Callaway Apparel 
              </Link>

              <span className='text-muted fw-semibold d-block fs-7'>Lorem Ipsum</span>
            </div>
            <span className='badge badge-light fw-bold my-2'>82</span>
          </div>


          {/* end::Section */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Symbol */}
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label'>
              <img
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/icon_callway_f25555115b.png"
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>
          {/* end::Symbol */}
          {/* begin::Section */}
          <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
            <div className='flex-grow-1 me-2'>
            <Link className ={ clsx ('text-gray-800 text-hover-primary fs-6 fw-bold')} to={"/brand/callaway/goods"} > 
              Callaway Hardgoods
              </Link>
              
              <span className='text-muted fw-semibold d-block fs-7'>Lorem Ipsum</span>
            </div>
            <span className='badge badge-light fw-bold my-2'>280</span>
          </div>
          {/* end::Section */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Symbol */}
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label'>
              <img
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/ogio_favicon_ac591c347e_8de0fee6f4.png"
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>
          {/* end::Symbol */}
          {/* begin::Section */}
          <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
            <div className='flex-grow-1 me-2'>
            <Link className ={ clsx ('text-gray-800 text-hover-primary fs-6 fw-bold')} to={"/brand/ogio"} > 
           
              Ogio
              </Link>
              <span className='text-muted fw-semibold d-block fs-7'>Lorem Ipsum</span>
            </div>
            <span className='badge badge-light fw-bold my-2'>500</span>
          </div>
          {/* end::Section */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Symbol */}
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label'>
              <img
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/tm_thum_23fdeb8c29.png"
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>
          {/* end::Symbol */}
          {/* begin::Section */}
          <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
            <div className='flex-grow-1 me-2'>
            <Link className ={ clsx ('text-gray-800 text-hover-primary fs-6 fw-bold')} to={"/brand/travis-methew"} > 
            
              Travis Mathew
              </Link>
              <span className='text-muted fw-semibold d-block fs-7'>Lorem Ipsum</span>
            </div>
            <span className='badge badge-light fw-bold fs my-2'>450</span>
          </div>
          {/* end::Section */}
        </div>
        {/* end::Item */}

       
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget4}
