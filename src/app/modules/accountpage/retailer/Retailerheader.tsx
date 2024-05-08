import React, { useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import SampleRetailerExcel from './importRetailer/SampleExcelRetailer'
import ImportRetailerModal from './importRetailer/ImportRetailerModal'




const Retailerheader = () => {
    const [isRetailer, setIsRetailer]= useState<boolean>(false)
  
    const [isSample, setIsSample]= useState<boolean>(false)
  
    const handleOpenRetailerModal=()=>{
        setIsRetailer(true)
       }
     
       const handleCloseRetailerModal=()=>{
         setIsRetailer(false)
       }

       // download sample Excel
       const handleDownloadExcel=()=>{
         setIsSample(true)
       }

       const handleCloseSampleExcel=()=>{
            setIsSample(false)
       }
  return (
    <div>

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
          <a
            // href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
            onClick={handleOpenRetailerModal}
          >
            <KTIcon iconName='plus' className='fs-3' />
            Import Retailers
          </a>
          <a
            // href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
            onClick={handleDownloadExcel}
          >
            <KTIcon iconName='plus' className='fs-3' />
            Sample Excel
          </a>
        </div>
      </div>

      <ImportRetailerModal
    isRetailer={isRetailer}
    onClose={handleCloseRetailerModal}
    />

    <SampleRetailerExcel
    isSample={isSample}
    resetIsSample={handleCloseSampleExcel}
    />
    </div>
  )
}

export default Retailerheader